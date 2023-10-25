import React, { ReactNode, useRef, useState } from 'react'

interface SliderProps {
	children: ReactNode
}

const Slider: React.FC<SliderProps> = ({ children }) => {
	const slider = useRef<HTMLDivElement>(null)

	const [isDown, setIsDown] = useState(false)

	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDown(true)
		setStartX(e.pageX - (slider.current?.offsetLeft as number))
		setScrollLeft(slider.current?.scrollLeft as number)
	}

	const handleMouseUpAndLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDown(false)
		if (slider.current) slider.current.style.cursor = 'default'
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDown) return
		e.preventDefault()
		const x = e.pageX - (slider.current?.offsetLeft as number)
		const step = (x - startX) * 1.5
		if (slider.current) {
			slider.current.style.cursor = 'grabbing'
			slider.current.scrollLeft = scrollLeft - step

			const firstElement = slider.current.children[0] as HTMLDivElement
			const lastElement = slider.current.children[1] as HTMLDivElement

			const itemWidth = firstElement.children[0].clientWidth
			console.log({ scrollLeft: slider.current.scrollLeft })
			if (slider.current.scrollLeft <= 0) {
				setScrollLeft(lastElement.offsetLeft - itemWidth)
			} else if (slider.current.scrollLeft >= lastElement.offsetLeft) {
				setScrollLeft(firstElement.offsetLeft - itemWidth)
			}
		}
	}

	return (
		<div
			ref={slider}
			className='flex gap-[24px] overflow-hidden '
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseUpAndLeave}
			onMouseUp={handleMouseUpAndLeave}
			onMouseMove={handleMouseMove}
		>
			{/* INNER CAROUSEL */}

			<div className='flex gap-[24px]'>{children}</div>
			{/* DUPLICATE */}
			<div className='flex gap-[24px]'>{children}</div>
		</div>
	)
}

export default Slider
