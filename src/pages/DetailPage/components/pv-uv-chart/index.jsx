import React from 'react';
import { Chart, Line, Point, Tooltip } from 'bizcharts';

// 数据源
const data = [
	{
		x: "2021年1月4日",
		key: "pv",
		value: 12648
	},
	{
		x: "2021年1月4日",
		key: "uv",
		value: 5267
	},
	{
		x: "2021年1月5日",
		key: "pv",
		value: 13783
	},
	{
		x: "2021年1月5日",
		key: "uv",
		value: 5336
	},
	{
		x: "2021年1月6日",
		key: "pv",
		value: 18983
	},
	{
		x: "2021年1月6日",
		key: "uv",
		value: 5936
	},
	{
		x: "2021年1月7日",
		key: "pv",
		value: 12983
	},
	{
		x: "2021年1月7日",
		key: "uv",
		value: 5069
	},
	{
		x: "2021年1月8日",
		key: "pv",
		value: 19278
	},
	{
		x: "2021年1月8日",
		key: "uv",
		value: 6738
	},
	{
		x: "2021年1月9日",
		key: "pv",
		value: 20382
	},
	{
		x: "2021年1月9日",
		key: "uv",
		value: 7282
	},
	{
		x: "2021年1月10日",
		key: "pv",
		value: 19282
	},
	{
		x: "2021年1月10日",
		key: "uv",
		value: 6377
	}
];

const scale = {
	value: { min: 0 },
	key: {
		formatter: v => {
			return {
				pv: '访问量',
				uv: '用户量'
			}[v]
		}
	}
}

class PvUvChart extends React.Component {
	constructor () {
		super();
		this.state = {

		};
	}

	render () {
		// return <Chart scale={scale} padding={[30, 20, 50, 40]} autoFit height={320} data={data} interactions={['element-active']}>
		// 	<Point position="x*value" color="key" shape='circle' />
		// 	<Line shape="smooth" position="x*value" color="key" label="value" />
		// 	<Tooltip shared showCrosshairs />
		// </Chart>;
		return null;
	}
}

export default PvUvChart;


