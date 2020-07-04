<template>
  <div>
    <div class="classdata">
      <div class="contant" v-for="(item,index) in list" :key="index">
        <div class="icon">
          <span class="iconfont icon-shujia"></span>
        </div>
        <div class="item">
          <div class="classtitle">{{item.major}}</div>
          <div class="tips" v-show="item.mins!=''">
            <span v-for="(itm,inx) in item.mins" :key="inx">| {{itm}}</span>
          </div>
          <div class="tips nopad" v-show="item.mins==''">
            <span>查看更多内容...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
.contant {
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
  .icon {
    float: left;
    margin-top: 5px;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    text-align: center;
    line-height: 40px;
    background-color: #fbcfd0;
    border-radius: 50%;
    .iconfont {
      font-size: 20px;
      color: white;
    }
  }
  .item {
    overflow: hidden;
    .classtitle {
      font-size: 14px;
      color: #333;
      height: 30px;
      line-height: 30px;
      font-weight: 600;
    }
    .tips {
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      left: -4px;
      top: 0px;
    }
    .nopad {
      margin-left: 4px;
    }
  }
}
</style>

<script>
export default {
  name: "classdata",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      classinfo: {
        data: {
          male: [
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" }
          ],
          female: [
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" },
            { major: "", mins: "" }
          ]
        }
      }
    };
  },
  props: ["tipname"],
  watch: {
    tipname: function(newval) {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      let self = this;
      this.$axios
        .get("/cats/lv2")
        .then(result => {
          self.classinfo = result;
          if (self.tipname == "男生专区") {
            this.list = self.classinfo.data.male;
            this.$toast.clear();
          } else if (self.tipname == "女生专区") {
            this.list = self.classinfo.data.female;
             this.$toast.clear();
          }
        })
        .catch(err => {
          // console.log(err)
        });
    }
  },
  created() {
    let self = this;
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true
      });
    this.$axios
      // 获取排行榜分类
      .get("/cats/lv2")
      .then(result => {
        self.classinfo = result;
        this.list = self.classinfo.data.male;
         this.$toast.clear();
      })
      .catch(err => {
        // console.log(err)
      });
  },
  methods: {
    onLoad() {
    }
  },
  mounted() {}
};
</script>