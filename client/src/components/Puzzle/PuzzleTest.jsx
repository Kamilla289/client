import React, { useEffect, useState } from 'react';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import img from '../../assets/image/pivo.jpg';
import loadingIcon from '../../assets/image/puzzle/loading.svg'
import Search from '../../assets/image/puzzle/searchIcon.svg';
import { Link } from 'react-router-dom';
import './Puzzle.css';

const defaultImage = img;

const PuzzleTest = () => {
  const [isSolved, setIsSolved] = useState(false);
  const [progress, setProgress] = useState(0);

  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(defaultImage);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert('Введите запрос!');
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!data.image_url) {
        alert('Ошибка генерации изображения');
        return;
      }

      const imageUrl = data.image_url;

      // Ждём загрузки изображения
      const imgLoader = new Image();
      imgLoader.onload = () => {
        setImage(imageUrl);
        setIsSolved(false);
      };
      imgLoader.onerror = () => {
        alert('Ошибка загрузки изображения. Попробуйте снова.');
      };
      imgLoader.src = imageUrl;

    } catch (err) {
      console.error(err);
      alert('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSolved) {
      const pieces = Array.from(document.querySelectorAll('.jigsaw-puzzle__piece'));
      const container = document.querySelector('.jigsaw-puzzle');

      const positions = pieces.map(piece => ({
        el: piece,
        rect: piece.getBoundingClientRect(),
      }));

      const topLeft = positions.reduce((min, curr) =>
        curr.rect.top + curr.rect.left < min.rect.top + min.rect.left ? curr : min
      );

      const topRight = positions.reduce((min, curr) =>
        curr.rect.top - curr.rect.left < min.rect.top - min.rect.left ? curr : min
      );

      const bottomLeft = positions.reduce((max, curr) =>
        curr.rect.top - curr.rect.left > max.rect.top - max.rect.left ? curr : max
      );

      const bottomRight = positions.reduce((max, curr) =>
        curr.rect.top + curr.rect.left > max.rect.top + max.rect.left ? curr : max
      );

      topLeft.el.style.borderTopLeftRadius = '25px';
      topRight.el.style.borderTopRightRadius = '25px';
      bottomLeft.el.style.borderBottomLeftRadius = '25px';
      bottomRight.el.style.borderBottomRightRadius = '25px';

      if (container) {
        container.style.borderRadius = '30px';
      }
    }
  }, [isSolved]);

  useEffect(() => {
    const container = document.querySelector('.jigsaw-puzzle');
    if (!container) return;

    const observer = new MutationObserver(() => {
      const solvedCount = container.querySelectorAll('.jigsaw-puzzle__piece--solved').length;
      setProgress(solvedCount);
      if (solvedCount === 16) {
        setIsSolved(true)
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    })
    return () => observer.disconnect()
  }, [])

  const handleText = () => {
    console.log('')
  }

  return (
    <div className="puzzle-wrapper">
      <div className="description-puzzle">
        <h2 className="title-puzzle">
          СОБЕРИ ПАЗЛ <br /> И ПОЛУЧИ ПРЕДСКАЗАНИЕ
        </h2>
        <div className="text-puzzle">
          Ты можешь собрать мою картинку, которую сейчас видишь на кусочках, а можешь обратиться к
          нейросети, чтобы она создала изображение специально для тебя!
        </div>

        <div className="search-container">
          <textarea
            name="search"
            id="search-input"
            placeholder="Введи свой запрос"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                await handleGenerate();
              }
            }}
          />
          <img
            src={Search}
            alt="знак поиска"
            className="icon-search"
            onClick={handleGenerate}
            style={{ cursor: 'pointer' }}
          />
        </div>


      </div>

      <div className="puzzle-container">
        {loading ? (
          <div className="load-wrapper">
            <div className="loader">
              <img className="loader-icon" src={loadingIcon} alt="Иконка загрузки типо" />
            </div>
            <p>Нейросеть создает изображение, подождите...</p>
          </div>
        ) : (
          < JigsawPuzzle
            imageSrc={image}
            rows={4}
            columns={4}
            onSolved={handleText}
            className="jigsaw-puzzle"
          />
        )}
      </div>

      <div className="event-container">
        <Link to="/abilities">
          <button className="button-gradient button-go-back go-back">Назад</button>
        </Link>
        <div className="progress-puzzle">
          <h3 className="progress-title">СОБРАНО:</h3>
          <div className="progress-number">{progress}/16</div>
        </div>
      </div>
    </div>
  );
};

export default PuzzleTest;
