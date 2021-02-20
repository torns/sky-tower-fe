import React from 'react';
import { Chart, Line, Point, Tooltip } from 'bizcharts';

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

// 日期格式化
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

function formatData(list) {
	return list.map((obj, key) => {
		return {
			index: key,
			x: new Date(Number(obj.date)).Format(list.length === 24 ? "HH时" : "yyyy年MM月dd日"),
			key: obj.key,
			value: Number(obj.value),
		};
	});
}


export default function PvUvChart(props) {
	return <Chart scale={scale} padding={[30, 20, 50, 40]} autoFit height={320} data={formatData(props.data)} interactions={['element-active']}>
		<Point position="x*value" color="key" shape='circle' />
		<Line shape="smooth" position="x*value" color="key" label="value" />
		<Tooltip shared showCrosshairs />
	</Chart>
}



