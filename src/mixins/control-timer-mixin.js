/**
 * Created by spring on 2018/6/8.
 */
import Config from "../config";
export default {
    data() {
        return {
            refreshTimes: Config.REFRESH_TIMES,
            time: Config.REFRESH_INTERVAL,
            timer: ''
        }
    },
    methods: {
        initPaging() {
            this.refreshTimes = Config.REFRESH_TIMES;
            this.refreshPage();
        },
        refreshPage() {
            this.timer = setTimeout(() => {
                if (this.refreshTimes) {
                    this.$emit('refreshPage');
                    this.refreshTimes --;
                    this.refreshPage();
                }
            }, this.time)
        },
    },
}