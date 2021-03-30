import { YMaps, Map, SearchControl, Placemark, Polyline } from 'react-yandex-maps';
import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import '../App.css';
import {
    Typography,
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Row,
    Col,
    Space,
    Slider
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import SearchComplete from "./SearchComplete";
import CustomSlider from "./CustomSlider";
const { Title } = Typography;


function JourneyEdit() {
    const [ymaps, setYmaps] = useState(null);
    const [points, setPoints] = useState([]);
    const [currPoints, setCurrPoints] = useState([]);
    const [smallCost, setSmallCost] = useState(0);
    const [avgCost, setAvgCost] = useState(0);
    const [largeCost, setLargeCost] = useState(0);
    const defmapState = {
        center: [55.751574, 37.573856],
        zoom: 5
    };

    const width = 600;
    const height = 500;

    function onMapClick(event) {
        let position = event.get('coords');
        console.log(position);
        ymaps.geocode(position)
            .then(result => {
                let newPoint = result.geoObjects.get(0).properties.getAll();
                newPoint.coordinates = position;
                addOutside(newPoint);
                onPointsListChange();
            });
    }


    const onJourneyFinish = (values) => {
        console.log('Success:', values);
    };

    const [pointsForm] = Form.useForm();

    const onArrivalDateChange = (index, value) => {
        const pointsList = pointsForm.getFieldsValue("points").points || [];
        const point = pointsList[index];
        point.dispatchDate = value;
        pointsForm.setFieldsValue({points: pointsList});
    }

    const onPointsListChange = () => {
        setPoints(pointsForm.getFieldsValue("points").points || []);
    }

    const addOutside = (newPoint) => {
        const pointsList = pointsForm.getFieldsValue("points").points || [];
        pointsList.push({address: newPoint.text, geoData: newPoint});
        pointsForm.setFieldsValue({points: pointsList});
    }

    const renderPoints = () => {
        const ps = points.map((point, index) => {
            return {geoData: point ? point.geoData : undefined, index: index};
        }).filter(point => point.geoData);
        return (
            <>
                {ps.map(el =>
                    <Placemark
                        key={el.index + 1}
                        geometry={el.geoData.coordinates}
                        properties={{
                            hintContent: el.geoData.text,
                            balloonContent: el.geoData.balloonContent,
                            iconContent: el.index + 1
                        }}
                        options={{
                            draggable: false
                        }}
                    />
                )}
                <Polyline
                    key={1}
                    geometry={
                        ps.map(el =>
                            el.geoData.coordinates
                        )
                    }
                    options={{
                        balloonCloseButton: false,
                        strokeColor: '#1E90FF',
                        strokeWidth: 4,
                        strokeOpacity: 0.5,
                    }}
                />
            </>
        )


    }

    return (
        <div className="App-container">
            <YMaps
                query={{ lang: "ru_RU", load: "package.full", apikey: "c23fb47e-a86c-40a3-95a6-866811b17aff" }}
            >
                <Title level={2} style={{ textAlign: 'center' }}>Create trip</Title>
                <Row justify="space-between">
                    <Col>
                        <Title level={3}>Trip points:</Title>
                        <Form
                            form={pointsForm}
                            colon={false}
                            layout='vertical'
                            name="dynamic_form_nest_item"
                            autoComplete="off"
                        >
                            <Form.List name="points"
                                       initialValue={[{}, {}]}
                            >
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(field => (
                                            <>
                                            <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Title level={3}>{field.name + 1}</Title>
                                                <Form.Item
                                                    {...field}
                                                    label="Point address"
                                                    name={[field.name, 'address']}
                                                    key={[field.fieldKey, 'address']}
                                                    rules={[{ required: true, message: 'Please input point address!', }]}
                                                    style={{ width: 250, display: 'inline-block' }}
                                                >
                                                    <SearchComplete ymaps={ymaps}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    label="Arrival date"
                                                    name={[field.name, 'arrivalDate']}
                                                    key={[field.fieldKey, 'arrivalDate']}
                                                    rules={[
                                                        { required: true, message: 'Please input arrival date!', }
                                                    ]}
                                                    style={{ width: 140}}
                                                    tooltip="Time of arrival at this point"
                                                >
                                                    <DatePicker
                                                                showTime
                                                                name={[field.name, 'arrivalDate']}
                                                                onChange={(value) => {
                                                                    onArrivalDateChange(field.name, value)
                                                                }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'dispatchDate']}
                                                    key={[field.fieldKey, 'dispatchDate']}
                                                    label="Dispatch date"
                                                    rules={[
                                                        { required: true, message: 'Please input dispatch date!', }
                                                    ]}
                                                    style={{ width: 140}}
                                                    tooltip="Departure time from this point"

                                                >
                                                    <DatePicker showTime />
                                                </Form.Item>


                                                <MinusCircleOutlined
                                                    key={field.key}
                                                    onClick={() => {
                                                        remove(field.name);
                                                        onPointsListChange();
                                                    }}
                                                />
                                            </Space>
                                                <Form.Item
                                                    name={[field.name, 'comment']}
                                                    label="Comment"
                                                    tooltip="Comment on this point (tips how to find and so on)"
                                                >
                                                    <Input.TextArea rows={1} />
                                                </Form.Item>
                                            </>

                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => {
                                                    add();
                                                    onPointsListChange();
                                                }} block
                                                icon={<PlusOutlined />}>
                                                Add point
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col>
                        <Map
                            defaultState={defmapState}
                            width={width}
                            height={height}
                            onClick={onMapClick.bind(this)}
                            onLoad={ymaps => setYmaps(ymaps)}
                        >
                            <SearchControl
                                options={{ provider: 'yandex#search' }}
                            />
                            {renderPoints()}
                        </Map>

                    </Col>
                </Row>
            </YMaps>
            <Title level={2} style={{ textAlign: 'center' }} className="mt-5"> Trip order info</Title>
            <Form
                colon={false}
                name="journey"
                onFinish={onJourneyFinish}
            >
                <Form.Item
                    name="orderCount"
                    label="The number of orders"
                    tooltip="Indicate the maximum number of orders that you can take on a trip"
                    rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 1,
                        },
                    ]}

                >
                    <InputNumber />
                </Form.Item>
                <CustomSlider name="smallCost" label="Small order cost" max={5000}/>
                <CustomSlider name="avgCost" label="Average order cost" max={10000}/>
                <CustomSlider name="largeCost" label="Large order cost" max={20000}/>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create journey
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default JourneyEdit