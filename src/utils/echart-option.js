/**
 * Created by spring on 2018/5/11.
 */
export default{
    getLineOption(data, option) {
        let lineOption = JSON.parse(JSON.stringify(defaultLineOption));
        if (option) {
            if (option.xName) lineOption.xAxis.name = option.xName;
            if (option.yName) lineOption.yAxis.name = option.yName;
            if (option.startColor) {
                lineOption.series[0].areaStyle.color.colorStops[0].color = option.startColor;
                lineOption.series[0].lineStyle.color = option.startColor;
            }
            if (option.endColor) {
                lineOption.series[0].areaStyle.color.colorStops[1].color = option.endColor;
            }
            if (option.color) {
                lineOption.xAxis.nameTextStyle.color = option.color;
                lineOption.xAxis.axisLabel.color = option.color;
                lineOption.yAxis.nameTextStyle.color = option.color;
                lineOption.yAxis.axisLabel.color = option.color;
            }
            if (option.ySplitLine) {
                lineOption.yAxis.splitLine.lineStyle = option.ySplitLine;
            }
            if (option.line) {
                lineOption.xAxis.axisLine = option.line;
                lineOption.yAxis.axisLine = option.line;
            }
            if (option.area) {
                lineOption.series[0].areaStyle = option.area;
                lineOption.series[0].lineStyle.color = option.area.color.colorStops[0].color;
            }

        }
        lineOption.xAxis.data = data.title;
        lineOption.series[0].data = data.value;
       return lineOption;
    },
    getPieOption(data, option) {
        let pieOption = JSON.parse(JSON.stringify(defaultPieOption));
        if (option) {
            // if (option.title) pieOption.legend.data = option.title;
            if (option.name) pieOption.series[0].name = option.name;
            if (option.color) pieOption.color = option.color;
            if (option.title) {
                pieOption.title = option.title;
                pieOption.series[0].label.emphasis.show = false
            }
        }
        pieOption.series[0].data = data;
        return pieOption
    }
}
let defaultLineOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
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
            color: '#8FABD2',
            padding: [10,10,20,10]
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
        name: '',
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0.3, color: '#44B5FD'
                }, {
                    offset: 0.93, color: 'rgba(110,193,246, 0.17)'
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
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        // showContent: false
    },
    title: {
        text:'',
        left:'center',
        top:'45%',
        // padding:[24,0],
        textStyle:{
            color:'#fff',
            fontSize:20,
            align:'center'
        }
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['75%', '90%'],
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