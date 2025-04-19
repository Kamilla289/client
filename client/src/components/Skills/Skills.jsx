import React, { useEffect, useRef } from 'react'
import Sector from '../Desing/Sector'

const images = [
  '/SVG/res1.svg',
  '/SVG/res2.svg',
  '/SVG/res3.svg',
  '/SVG/res4.svg',
  '/SVG/res5.svg',
  '/SVG/res6.svg',
  '/SVG/res7.svg',
  '/SVG/res8.svg'
]

const Skills = () => {
  const skillRef = useRef(null)
  const itemImage = useRef([])

  useEffect(() => {
    const canvas = skillRef.current
    const itemCanvas = canvas.getContext("2d")

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const w = canvas.width
    const h = canvas.height

    const loadImages = images.map(src => {
      return new Promise(resolve => {
        const img = new Image()
        img.src = src
        img.width = 60
        img.height = 40
        img.onload = () => resolve(img)
      })
    })

    Promise.all(loadImages).then(loadedImages => {
      itemImage.current = loadedImages.map(image => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        image,
        size: 40
      }));
      function animate() {
        itemCanvas.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < itemImage.current.length; i++) {
          const img = itemImage.current[i]

          img.x += img.vx
          img.y += img.vy
          if (img.x < 0 || img.x + img.size > canvas.width) {
            img.vx *= -1
          };
          if (img.y < 0 || img.y + img.size > canvas.height) {
            img.vy *= -1
          }
          for (let j = i + 1; j < itemImage.current.length; j++) {
            const newImg = itemImage.current[j]
            const ox = img.x - newImg.x
            const oy = img.y - newImg.y
            const dist = Math.sqrt(ox * ox + oy * oy)
            if (dist < img.size) {
              [img.vx, newImg.vx] = [newImg.vx, img.vx],
                [img.vy, newImg.vy] = [newImg.vy, img.vy]
            }
          }
          itemCanvas.drawImage(img.image, img.x, img.y, img.size, img.size)
        }
        requestAnimationFrame(animate)
      }
      animate()
    })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])


  return (
    <Sector>
      <canvas ref={skillRef} style={{ width: '100%', height: '100%' }} />
    </Sector>
  )
}

export default Skills