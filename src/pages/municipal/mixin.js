/**
 * Created by spring on 2018/6/7.
 */
import Config from "../../config";
export default {
    data() {
        return {
            searchParams: {},
            defaultPaging: {
                pageSize: Config.DEFAULT_PAGE_SIZE
            },
            list: [],
            selectionList: [],
            selectionDeviceIds: [],
            selectionIds: [],
            companies: [],
            tableRef: 'my-table',
        }
    },
    created() {
        this.initList();
        this.initCompanies();
    },
    methods: {
        initList() {
            this.findList(this.defaultPaging);
        },
        initCompanies() {
            this.$globalCache.companies.then(companies => {
                this.companies = companies;
            })
        },
        search: function () {
            this.findList(Object.assign(this.searchParams, this.defaultPaging));
        },
        clearSearchParams: function (e) {
            this.searchParams = {};
            this.initList();
        },
        handleSelectionChange(val) {
            this.selectionList = val;
            this.selectionDeviceIds = [];
            this.selectionIds = [];
            val.forEach(item => {
                this.selectionDeviceIds.push(item.deviceId);
                this.selectionIds.push(item.id)
            });
        },
        isSelectable(row,index) {
            return row.status != 1
        }
    }
}