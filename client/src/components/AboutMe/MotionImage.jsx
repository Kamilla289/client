import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { aboutMe } from '../../data/AboutMe';

const MotionImage = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const engine = useRef(null);
  const bodies = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Создаём движок
    engine.current = Matter.Engine.create();
    const world = engine.current.world;

    engine.current.gravity.y = 0;
    engine.current.gravity.x = 0;
    engine.current.positionIterations = 10;
    engine.current.velocityIterations = 8;

    const BOX_SIZE = 170;

    // Создаём стены по периметру
    const walls = [
      // top
      Matter.Bodies.rectangle(containerWidth / 2, 0 - 5, containerWidth, 10, { isStatic: true }),
      // bottom (сдвинут вверх на BOX_SIZE / 2)
      Matter.Bodies.rectangle(containerWidth / 2, containerHeight - BOX_SIZE / 2, containerWidth, 10, { isStatic: true }),
      // left
      Matter.Bodies.rectangle(0 - 5, containerHeight / 2, 10, containerHeight, { isStatic: true }),
      // right (сдвинут влево на BOX_SIZE / 2)
      Matter.Bodies.rectangle(containerWidth - BOX_SIZE / 2, containerHeight / 2, 10, containerHeight, { isStatic: true }),
    ];
    Matter.World.add(world, walls);

    // Создаём физические контейнеры
    bodies.current = aboutMe.image.map(() => {
      const body = Matter.Bodies.rectangle(
        Math.random() * (containerWidth - BOX_SIZE),
        Math.random() * (containerHeight - BOX_SIZE),
        BOX_SIZE,
        BOX_SIZE,
        {
          restitution: 1,        // Отскок
          friction: 0,
          frictionAir: 0,
          inertia: Infinity,     // Без вращения
          inverseInertia: 0,
          mass: 1,
        }
      );

      Matter.Body.setVelocity(body, {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2 + 1),
        y: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2 + 1),
      });

      return body;
    });

    Matter.World.add(world, bodies.current);

    // Основной цикл
    const update = () => {
      bodies.current.forEach((body, i) => {
        const el = imageRefs.current[i];
        if (el) {
          const x = body.position.x - BOX_SIZE / 2;
          const y = body.position.y - BOX_SIZE / 2;
          el.style.transform = `translate(${x}px, ${y}px)`;
        }
      });

      Matter.Engine.update(engine.current, 1000 / 60);
      requestAnimationFrame(update);
    };

    update();

    return () => {
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="motion-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {aboutMe.image.map((img, index) => (
        <div
          key={img.id}
          ref={(el) => (imageRefs.current[index] = el)}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            willChange: 'transform',
            transform: 'translate(0px, 0px)',
            pointerEvents: 'none',
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '12px',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MotionImage;
