import React, {useState,useEffect} from 'react'
import {Statistic, Row, Col,Card} from 'antd'
import axios from 'axios'
import api from '../../config/api'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/pictorialBar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const ArticleType = (props) => {

    useEffect(()=>{
        drawChart()
    },[])

    const drawChart = () => {
        var myChart = echarts.init(document.getElementById('type-main'));
        let bgColor = '#fff', fontColor = '#666';
        let chartData = [
            {name: '1', value: 300},
            {name: '2', value: 400},
            {name: '3', value: 452},
            {name: '4', value: 770},
            {name: '5', value: 650},
            {name: '6', value: 256},
            {name: '7', value: 350},
            {name: '8', value: 422},
            {name: '9', value: 235},
            {name: '10', value: 658},
            {name: '11', value: 600},
            {name: '12', value: 400},
            {name: '13', value: 523},
            {name: '14', value: 482},
            {name: '15', value: 423}
        ]
        
        let xData = chartData.map(v=>v.name);
        let sData = chartData.map(v=>v.value);
        
        let lineOption = {
            lineStyle: {
                color: 'rgba(151,151,151,0.5)',
                type: 'dashed'
            }
        }
        
        const option = {
            backgroundColor: bgColor,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top: '14%',
                right: '3%',
                left: '5%',
                bottom: '14%'
            },
            xAxis: [{
                type: 'category',
                data: xData,
                axisLine: lineOption,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 10,
                    color: fontColor,
                    textStyle: {
                        fontSize: 14
                    },
                },
            }],
            yAxis: [{
                axisLabel: {
                    formatter: '{value}',
                    color: fontColor,
                },
                axisTick: {
                    show: false
                },
                axisLine: lineOption,
                splitLine: lineOption
            },{
                axisLine: lineOption,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show:false
                }
            }],
            series: [{
                type: 'bar',
                data: sData,
                barWidth: '20px',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00BD89' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#C9F9E1' // 100% 处的颜色
                        }], false)
                    }
                }
            }]
        };
        // 绘制图表
        myChart.setOption(option);
    }
    return (
        <div>
            <div id="type-main" style={{ height: 400 }}></div>
        </div>
    )
}

export default ArticleType

