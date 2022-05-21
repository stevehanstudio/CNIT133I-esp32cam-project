import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'
import './App.scss'
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
	const [state, setState] = useState({
		brightness: 0,
		saturation: 0,
		contrast: 0,
		special_effect: 0,
	})

	// Reset states on the ESP32 Camera Server.  A limition of the API is only one value can
	// be changed per GET request
	useEffect(() => {
		(async function() {
			try {
				await fetch(`${CAMERA_URL}/control?var=brightness&val=0`)
				await	fetch(`${CAMERA_URL}/control?var=contrast&val=0`)
				await	fetch(`${CAMERA_URL}/control?var=saturation&val=0`)
				await	fetch(`${CAMERA_URL}/control?var=special_effect&val=0`)
				console.log('Finished resetting')
			} catch {
				throw Error('Error resetting')
			}
		})()
	}, [])

	const handleValueChange = (e, attr) => {
		const newValue = e.target.value
		const oldValue = state[attr]
		setState({ ...state, [attr]: newValue })

		fetch(`${CAMERA_URL}/control?var=${attr}&val=${newValue}`)
			.then(() => {
				console.log(`${attr} change success!`)
			})
			.catch(err => {
				console.log(`Error changing ${attr},`, err)
				setState({ ...state, [attr]: oldValue })
				toast.error(`Problem with ESP32-CAM.  ${attr} not changed.`, {
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
				<Row className='mt-5'>
					<Col lg={8}>
						<img
							src={`${CAMERA_URL}:81/`}
							width='640'
							height='480'
							alt=''
						/>
					</Col>
					<Col lg={4}>
						<Form className='p-1'>
							<Form.Group className='p-1 mt-4'>
								<Form.Label>Brightness</Form.Label>
								<RangeSlider
									value={state['brightness']}
									step={1}
									onChange={e => handleValueChange(e, 'brightness')}
									min={MIN_BRIGHTNESS}
									max={MAX_BRIGHTNESS}
									tooltipPlacement='bottom'
									tooltip='auto'
								/>
								<Form.Label className='mt-5'>Contrast</Form.Label>
								<RangeSlider
									value={state['contrast']}
									step={1}
									onChange={e => handleValueChange(e, 'contrast')}
									min={MIN_CONTRAST}
									max={MAX_CONTRAST}
									tooltipPlacement='bottom'
									tooltip='auto'
								/>
								<Form.Label className='mt-5'>Saturation</Form.Label>
								<RangeSlider
									value={state['saturation']}
									step={1}
									onChange={e => handleValueChange(e, 'saturation')}
									min={MIN_SATURATION}
									max={MAX_SATURATION}
									tooltipPlacement='bottom'
									tooltip='auto'
								/>
								<Form.Label className='mt-5'>Special Effect</Form.Label>
								<Form.Control
									as='select'
									value={state['specialEffect']}
									onChange={e =>
										handleValueChange(e, 'special_effect')
									}
								>
									<option>
										{SpecialEffects[state['special_effect']]}
									</option>
									{SpecialEffects.map(
										(item, index) =>
											index !== state['special_effect'] && (
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
