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
    terminalType: [
        {value: 1, text: '井盖', name: 'well'},
        {value: 2, text: '水位监测', name: 'waterLevel'},
        {value: 3, text: '门开关检测', name: 'door'},
        {value: 4, text: '姿态感应', name: 'pose'},
        {value: 5, text: '振动检测', name: 'shake'},
        {value: 6, text: '声音识别', name: 'voice'},
        {value: 7, text: '视频', name: 'video'},
        {value: 8, text: '气象监测', name: 'weather'},
        {value: 9, text: '浸水检测', name: 'inundate'},
        {value: 10, text: '光照度检测', name: 'illuminance'},
        {value: 11, text: '摄像头', name: 'camera'},
    ],
    switchState: [
        {value: 1, text: '开'},
        {value: 2, text: '关'},
    ],
    lightControllerType: [
        {value: 1, text: '普通型单灯控制器-LCCHZT'},
        {value: 2, text: '单灯控制器标准版-LCC1ZT'},
    ],
    loopControllerType: [
        {value: 1, text: '回路控制器- CCZ1ZT'},
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
    apMapState: [
        {value: '1', text: '在线'},
        {value: '2', text: '离线'},
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
    ],
    wellStatus: [
        {value: 0, text: '正常'},
        {value: 1, text: '离线'},
        {value: 2, text: '告警'},
    ],
    loopStatus: [
        {value: 1, text: '在线'},
        {value: 2, text: '离线'},
    ],
    companyFlag: [
        {value: 0, text: '激活'},
        {value: 1, text: '冻结'},
    ],
    lightStatus: [
        {value: 1, text: '正常'},
        {value: 2, text: '故障'},
        {value: 3, text: '离线'},
        {value: 4, text: '未知'},
    ],
    alarmDuty: [
        {value: 1, text: '开启'},
        {value: 0, text: '关闭'},
    ],
    doorModel: [
        {value: 'DMZ1ZT', text: 'DMZ1ZT'}
    ],
    illuminanceModel: [
        {value: 'OPZ1ZT', text: 'OPZ1ZT'}
    ],
    inundateModel: [
        {value: 'WDZ1ZT', text: 'WDZ1ZT'}
    ],
    weatherModel: [
        {value: 'MLZ1ZT', text: 'MLZ1ZT'}
    ],
    waterLevel: [
        {value: 'WLL2ZT', text: 'WLL2ZT'}
    ],
};

export default CommonConstant;
