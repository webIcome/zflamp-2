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
            service: {}
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
        findList(params) {
            this.service.findList(params).then(data => {
                this.searchParams.pageNum = data.pageNum;
                this.searchParams.pages = data.pages;
                this.searchParams.pageSize = data.pageSize;
                this.searchParams.total = data.total;
                this.list = data.list;
            })
        },
        refreshPage() {
            this.service.findList(this.searchParams).then(data => {
                this.list.forEach(item => {
                    data.list.forEach(i => {
                        if (i.sn == item.sn) {
                            Object.assign(item, i);
                        }
                    })
                })
            })
        },
        search: function () {
            this.findList(Object.assign(this.searchParams, this.defaultPaging));
        },
        pagingEvent(pageNumber) {
            if (pageNumber) this.searchParams.pageNum = pageNumber;
            this.findList(this.searchParams);
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