/**
 * Created by spring on 2018/6/8.
 */
import Config from "../config";
export default {
    data() {
        return {
            REFRESH_TIMES: Config.REFRESH_TIMES,
            TIMER: ''
        }
    },
    methods: {
        initPaging() {
            this.REFRESH_TIMES = Config.REFRESH_TIMES;
            clearTimeout(this.TIMER);
            this.refreshPage();
        },
        refreshPage() {
            this.$emit('refreshPage');
            this.TIMER = setTimeout(() => {
                if (this.REFRESH_TIMES) {
                    this.REFRESH_TIMES --;
                    this.refreshPage();
                }
            }, Config.REFRESH_INTERVAL)
        },
    },
}