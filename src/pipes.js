/**
 * Created by spring on 2018/1/19.
 */
import moment from "moment";
import Common from './constants/common';
export default {
    formDate: _formDate,
    formTime: _formTime,
    formWeek: _formWeek,
    lampTypeNameConverter: _lampTypeNameConverter,
    powerTypeNameConverter: _powerTypeNameConverter,
    deviceTypeNameConverter: _deviceTypeNameConverter,
    deviceStateNameConverter: _deviceStateNameConverter,
    runningstateNameConverter: _runningstateNameConverter,
    switchStateNameConverter: _switchStateNameConverter,
    strategyStateNameConverter: _strategyStateNameConverter,
    lightControllerTypeNameConverter: _lightControllerTypeNameConverter,
    sensortypeNameConverter: _sensortypeNameConverter,
    enableSensorNameConverter: _enableSensorNameConverter,
    signNameConverter: _signNameConverter,
    modeNameConverter: _modeNameConverter,
    noinducedbrightnessNameConverter: _noinducedbrightnessNameConverter,
    apStateNameConverter:_apStateNameConverter,
    vendorNameConverter:_vendorNameConverter,
    taskCmdNameConverter: _taskCmdNameConverter,
    taskStatusNameConverter: _taskStatusNameConverter,
    taskPeriodTypeNameConverter: _taskPeriodTypeNameConverter,
    wellStatusNameConverter: _wellStatusNameConverter,
    loopStatusNameConverter:_loopStatusNameConverter,
    companyFlagNameConverter:_companyFlagNameConverter,
}
function _formDate(date, pattern) {
    if (!date) return;
    if (!pattern) pattern = 'YYYY-MM-DD HH:mm:ss';
    return moment(date).format(pattern);
}
function _formTime(date, pattern) {
    if (!date) return;
    if (!pattern) pattern = 'HH:mm:ss';
    return moment(Number(date)).format(pattern);
}
function _formWeek(value) {
    let name = [];
    Common.week.forEach(item => {
        if (Number(value) == item.value) {
            name.push(item.text);
        }
    });
    return name.join();
}
function _lampTypeNameConverter(value) {
    let name = value;
    Common.lampType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _powerTypeNameConverter(value) {
    let name = value;
    Common.powerType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _deviceTypeNameConverter(value) {
    let name = value;
    Common.deviceType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _deviceStateNameConverter(value) {
    let name = value;
    Common.deviceState.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}

function _runningstateNameConverter(value) {
    let name = value;
    Common.runningStatus.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _switchStateNameConverter(value) {
    let name = value;
    Common.switchState.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _strategyStateNameConverter(value) {
    let name = value;
    Common.strategyState.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _lightControllerTypeNameConverter(value) {
    let name = value;
    Common.lightControllerType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _sensortypeNameConverter(value) {
    let name = value;
    Common.sensorType.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _enableSensorNameConverter(value) {
    let name = value;
    Common.enableSensor.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _signNameConverter(value) {
    let name = value;
    Common.sign.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _modeNameConverter(value) {
    let name = value;
    Common.mode.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _noinducedbrightnessNameConverter(value) {
    if (value == 255) {
        return '关灯'
    }
    return value;
}
function _enableSensorNameConverter(value) {
    let name = value;
    Common.enableSensor.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name;
}
function _apStateNameConverter(value) {
    let name = value;
    Common.apState.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name
}
function _vendorNameConverter(value) {
    let name = value;
    Common.vendor.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name
}
function _taskCmdNameConverter(value) {
    let name = value;
    Common.taskCmd.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name
}
function _taskStatusNameConverter(value) {
    let name = value;
    Common.taskStatus.forEach(item => {
        if (Number(value) == item.value) {
            name = item.text;
        }
    });
    return name
}
function _taskPeriodTypeNameConverter(value) {
    let name = value;
    Common.taskPeriodType.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name
}
function _wellStatusNameConverter(value) {
    let name = value;
    Common.wellStatus.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name
}
function _loopStatusNameConverter(value) {
    let name = value;
    Common.loopStatus.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name
}
function _companyFlagNameConverter(value) {
    let name = value;
    Common.companyFlag.forEach(item => {
        if (value == item.value) {
            name = item.text;
        }
    });
    return name
}