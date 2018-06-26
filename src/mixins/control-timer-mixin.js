/**
 * Created by spring on 2018/6/8.
 */
import Config from "../config";
export default {
    data() {
        return {
            REFRESH_TIMES: Config.REFRESH_TIMES,
        }
    },
    methods: {
        initPaging() {
            this.REFRESH_TIMES = Config.REFRESH_TIMES;
            this.refreshPage();
        },
        refreshPage() {
            setTimeout(() => {
                if (this.REFRESH_TIMES) {
                    this.$emit('refreshPage');
                    this.REFRESH_TIMES --;
                    this.refreshPage();
                }
            }, Config.REFRESH_INTERVAL)
        },
    },
}