<template>
  <div class="rank">
    <div>
      <div class="lefttree">
        <div
          class="leftitle"
          v-for="(item,index) in leftlist"
          :key="index"
          @click="changlist(item,index)"
        >
          <div :class="['inner',actindex == index? 'active':'']">{{item.shortTitle}}</div>
        </div>
      </div>
      <div class="righttree">

        <rigthlist :idname="idindex"></rigthlist>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.rank {
  overflow-y: scroll;
}
.lefttree {
  position: fixed;
  width: 125px;
  overflow-y: scroll;
  border-right: 1px solid #e6e6e6;
  text-align: center;
  .leftitle {
    padding: 16px 0px;
    border-bottom: 1px solid #e6e6e6;
    .inner {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      color: #8a8a8f;
    }
    .active {
      border-left: 2px solid #ee0a24;
    }
  }
}
.righttree {
  padding-left: 125px;
  width: 100%;
  box-sizing: border-box;
}
</style>
<script>
import rigthlist from "../rank/ranklist";
export default {
  data() {
    return {
      leftlist: [{ _id: 0 }],
      idindex: 0,
      actindex: 0
    };
  },
  props: ["tipName"],
  watch: {
    tipName: function(newval) {
      // 函数防抖
      var timer;
      var self = this;
      function fool(event) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          self.$toast.loading({
            message: "加载中...",
            forbidClick: true
          });
          self.requiredata();
          self.actindex = 0;
        }, 1000);
      }
      fool();
    }
  },
  created() {
    console.log(this.tipName,'tipname')
    this.requiredata();
  },
  methods: {
    requiredata() {
      this.$axios.get("/ranking/gender").then(result => {
        console.log(result,'rank')
        switch (this.tipName) {
          case "女频":
            this.leftlist = result.data.female;
            this.idindex = result.data.female[0]._id;
            break;
          case "男频":
            this.leftlist = result.data.male;
            this.idindex = result.data.male[0]._id;
            console.log(this.leftlist)
            break;
          case "出版":
            this.leftlist = result.data.epub;
            this.idindex = result.data.epub[0]._id;
            break;
          default:
            break;
        }
      });
    },
    changlist(item, index) {
      this.idindex = item._id;
      this.actindex = index;
    }
  },
  components: {
    rigthlist
  },
  mounted() {
    var rankh =
      window.innerHeight ||
      document.body.clientHeight ||
      document.documentElement.clientHeight;
    document.getElementsByClassName("lefttree")[0].style.height =
      rankh - 95 + "px";
    document.getElementsByClassName("righttree")[0].style.height =
      rankh - 95 + "px";
  }
};
</script>