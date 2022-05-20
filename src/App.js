import React, { useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'
import './custom.scss'
// import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CAMERA_URL = 'http://192.168.0.119'

const MIN_BRIGHTNESS = -2.0
const MAX_BRIGHTNESS = 2.0
const MIN_SATURATION = -2.0
const MAX_SATURATION = 2.0
const MIN_CONTRAST = -2.0
const MAX_CONTRAST = 2.0

const SpecialEffects = [
	"No Special Effect",
	"Negative",
	"Greyscale",
	"Red Tint",
	"Green Tint",
	"Blue Tint",
	"Sepia"
]

function App() {
	const [brightness, setBrightness] = useState(0)
	const [saturation, setSaturation] = useState(0)
	const [contrast, setContrast] = useState(0)
	const [specialEffect, setSpecialEffect] = useState(0)

	const handleBrightnessChange = (e) => {
		const newBrightness = e.target.value
		const oldBrightness = brightness

		setBrightness(newBrightness)

		fetch(`${CAMERA_URL}/control?var=brightness&val=${newBrightness}`)
			.then(() => {
				console.log('Brightness Change Success!')
			})
			.catch(err => {
				console.log('Error changing brightness,', err)
				setBrightness(oldBrightness)
				toast.error('Problem with ESP32-CAM.  Brightness not changed.', {
					autoClose: 3000
				})
			})
	}

	const handleSaturationChange = e => {
		const newSaturdation = e.target.value
		const oldSaturation = saturation

		setSaturation(newSaturdation)

		fetch(`${CAMERA_URL}/control?var=saturation&val=${newSaturdation}`)
			.then(() => {
				console.log('Saturation Change Success!')
			})
			.catch(err => {
				console.log('Error changing saturation,', err)
				setSaturation(oldSaturation)
				toast.error('Problem with ESP32-CAM.  Saturation not changed', {
					autoClose: 3000,
				})
			})
	}

	const handleContrastChange = e => {
		const newContrast = e.target.value
		const oldContrast = contrast

		setContrast(newContrast)

		fetch(`${CAMERA_URL}/control?var=contrast&val=${newContrast}`)
			.then(() => {
				setContrast(newContrast)
				console.log('Contrast Change Success!')
			})
			.catch(err => {
				console.log('Error changing contrast,', err)
				setContrast(oldContrast)
				toast.error('Contrast not changed', {
					autoClose: 3000,
				})
			})
	}

	const handleSpecialEffectChange = e => {
		const newSpecialEffect = e.target.value

		fetch(
			`${CAMERA_URL}/control?var=special_effect&val=${newSpecialEffect}`
		)
			.then(() => {
				setSpecialEffect(newSpecialEffect)
				console.log('Special Effect Change Success!')
			})
			.catch(err => {
				console.log('Error changing special effect,', err)
				toast.error('Special Effect not changed', {
					autoClose: 3000,
				})
			})
	}
	return (
		<div className='App'>
			<ToastContainer theme='colored' />
			<Container>
				<Row>
					<h1>Video from ESP32-Cam</h1>
				</Row>
				<Row>
					<Col lg={8}>
						Video
						{/* <img
							src={`${CAMERA_URL}:81/`}
							width='640'
							height='480'
							alt=''
						/> */}
					</Col>
					<Col lg={4}>
						<Form className='p-1'>
							<Form.Group className='p-1'>
								<Form.Label>Brightness</Form.Label>
								<RangeSlider
									// className='m-3'
									value={brightness}
									step='0.1'
									onChange={handleBrightnessChange}
									// tooltipStyle="background: blue"
									min={MIN_BRIGHTNESS}
									max={MAX_BRIGHTNESS}
									tooltipPlacement='bottom'
									tooltip='auto'
								/>
								<Form.Label className='mt-5'>Saturation</Form.Label>
								<RangeSlider
									// className='mb-3'
									value={saturation}
									step='0.1'
									onChange={handleSaturationChange}
									min={MIN_SATURATION}
									max={MAX_SATURATION}
									tooltipPlacement='bottom'
									tooltip='auto'
								/>
								<Form.Label className='mt-5'>Contrast</Form.Label>
								<RangeSlider
									// className='mb-3'
									value={contrast}
									step='0.1'
									onChange={handleContrastChange}
									min={MIN_CONTRAST}
									max={MAX_CONTRAST}
									tooltipPlacement='bottom'
									tooltip='auto'
								/>
								<Form.Control
									as='select'
									value={specialEffect}
									className='mt-5'
									onChange={handleSpecialEffectChange}
								>
									<option>{SpecialEffects[specialEffect]}</option>
									{SpecialEffects.map(
										(item, index) =>
											index !== +specialEffect && (
												<option value={index} key={index}>
													{item}
												</option>
											)
									)}
									)
								</Form.Control>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default App;
