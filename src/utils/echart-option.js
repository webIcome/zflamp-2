/**
 * Created by spring on 2018/5/11.
 */
export default{
    getLineOption(data, option) {
        if (option) {
            if (option.xName) defaultLineOption.xAxis.name = option.xName;
            if (option.yName) defaultLineOption.yAxis.name = option.yName;
            if (option.startColor) defaultLineOption.series[0].areaStyle.color.colorStops[0].color = option.startColor;
            if (option.endColor) {
                defaultLineOption.series[0].areaStyle.color.colorStops[1].color = option.endColor;
                defaultLineOption.series[0].lineStyle.color = option.endColor;
            }
            if (option.color) {
                defaultLineOption.xAxis.nameTextStyle.color = option.color;
                defaultLineOption.xAxis.axisLabel.color = option.color;
                defaultLineOption.yAxis.nameTextStyle.color = option.color;
                defaultLineOption.yAxis.axisLabel.color = option.color;
            }
            if (option.ySplitLine) {
                defaultLineOption.yAxis.splitLine.lineStyle = option.ySplitLine;
            }
            if (option.line) {
                defaultLineOption.xAxis.axisLine = option.line;
                defaultLineOption.yAxis.axisLine = option.line;
            }
            if (option.area) {
                defaultLineOption.series[0].areaStyle = option.area;
            }

        }
        defaultLineOption.xAxis.data = data.title;
        defaultLineOption.series[0].data = data.value;
       return defaultLineOption;
    },
    getPieOption(data, option) {
        if (option) {
            if (option.title) defaultPieOption.legend.data = option.title;
            if (option.name) defaultPieOption.series[0].name = option.name;
            if (option.color) defaultPieOption.color = option.color;
        }
        defaultPieOption.series[0].data = data;
        return defaultPieOption
    }
}
let defaultLineOption = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        nameTextStyle: {
            color: '#8FABD2',
        },
        name: '日',
        axisLabel: {
            color: '#8FABD2'
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                width: 0.15,
                color: '#ddd',

            }
        },
        nameTextStyle: {
            color: '#8FABD2'
        },
        name: 'Wh',
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#8FABD2'
        },
    },

    series: [{
        type: 'line',
        smooth: true,
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0.5, color: '#44B5FD'
                }, {
                    offset: 1, color: 'rgba(110,193,246, 0.17)'
                }],
            }
        },
        lineStyle: {
            color: '#44B5FD',
            width: 3,
        },
        itemStyle: {
            opacity: 0
        }
    }]
}
let defaultPieOption = {
    color: ['#5282E6', '#7654DF', '#FF6668', '#FF854A', '#5282E6'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['80%', '90%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            }
        }
    ]
}