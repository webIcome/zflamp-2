/**
 * Created by spring on 2018/4/8.
 */
const CommonConstant = {
    lampType: [
        {value: 1, text: '高压钠灯'},
        {value: 2, text: 'LED灯'},
        {value: 3, text: '高压金卤灯'},
        {value: 4, text: '无极灯'},
        {value: 5, text: '普通灯具'},
    ],
    deviceType: [
        {value: 1, text: '灯控器', name: 'light'},
        {value: 2, text: '回路控制器', name: 'loop'},
        {value: 3, text: '基站', name: 'station'},
    ],
    switchState: [
        {value: 1, text: '开'},
        {value: 2, text: '关'},
    ],
    lightControllerType: [
        {value: 1, text: '普通型单灯控制器-LCCHZT'},
    ],
    loopControllerType: [
        {value: 1, text: 'CCZ1ZT'},
    ],
    sensorType: [
        {value: 1, text: '无'},
        {value: 2, text: '光感'},
        {value: 3, text: '微波'},
    ],
    vendor: [
        {value: 1, text: '纵行zeta'},
    ],
    enableSensor: [
        {value: 1, text: '有效'},
        {value: 2, text: '无效'},
    ],
    runningStatus: [
        {value: 1, text: '正常'},
        {value: 2, text: '欠流'},
        {value: 3, text: '过流'},
        {value: 4, text: '欠压'},
        {value: 5, text: '过压'},
    ],
    deviceState: [
        {value: 1, text: '正常'},
        {value: 2, text: '灯具故障'},
        {value: 3, text: '电源故障'},
        {value: 4, text: '过压'},
        {value: 5, text: '欠压'},
        {value: 6, text: '过流'},
        {value: 7, text: '欠流'},
        {value: 8, text: '高温'},
        {value: 9, text: '电源功率故障'},
    ],
    apState: [
        {value: 'online', text: '在线'},
        {value: 'offline', text: '离线'},
    ],
    taskCmd: [
        {value: 'lightOn', text: '开灯'},
        {value: 'lightOff', text: '关灯'},
        {value: 'lightAdjust', text: '调亮度'},
        {value: 'circuitryOn', text: '开线路'},
        {value: 'circuitryOff', text: '关线路'},
        {value: 'circuitryMeter', text: '读取电表'},
    ],
    taskStatus: [
        {value: 0, text: '关闭'},
        {value: 1, text: '启动'},
    ],
    taskPeriodType: [
        // {value: 'single', text: '单次'},
        {value: 'day', text: '每天循环'},
        // {value: 'week', text: '每周循环'},
        // {value: 'interval', text: '按间隔循环'},
    ],
    week: [
        {value: '1', text: '周一'},
        {value: '2', text: '周二'},
        {value: '3', text: '周三'},
        {value: '4', text: '周四'},
        {value: '5', text: '周五'},
        {value: '6', text: '周六'},
        {value: '0', text: '周天'},
    ],
    loopnum: [
        {value: 4, text: 4},
    ]
};

export default CommonConstant;
