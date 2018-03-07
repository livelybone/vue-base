<template>
  <div class="linkage-wrap">
    <span class="value" :class="convertValue?'':'no-value'" @click="open=true">
      <span class="value" :class="convertValue?'':'no-value'" v-html="convertValue||(!canEdit?'':'请选择')"></span>
      <span v-if="canEdit" class="icon-go"></span></span>
    <div v-if="open&&canEdit" class="select" @touchmove="stopDefault($event)">
      <header>
        <div class="back"><span class="icon-back" @click="open=false"></span></div>
        <h2>{{name}}</h2>
        <!--<input-base v-model="keyword.value" :config="keyword"/>-->
      </header>
      <tree-menu :options="options" :checkedObj="checkedObj" @input="input"/>
      <span v-if="options.length<=0" class="tips">没有选项！</span>
    </div>
  </div>
</template>

<script>
  import TreeMenu from 'components/common/tree-menu'
  import { stopDefault } from "utils/broswer-default";
  import { deepCopy } from "utils/deep-copy";

  export default {
    name: 'Linkage',
    mounted() {
      if (this.value) this.myValue = this.value;
    },
    props: {
      name: String,
      value: {
        default() {
          return []
        },
        type: Array,
        validator(val) {
          console.log(val);
          return true;
        }
      }, // Array of index
      options: {
        default() {
          return [{
            name: 'aName',
            value: '1',
            children: [{
              name: 'bName',
              value: '11',
              children: [{
                name: 'cName',
                value: '111',
                children: [{
                  name: 'dName',
                  value: '1111',
                }]
              }]
            }]
          }]
        },
        type: Array
      },
      canEdit: {
        default: true,
        type: Boolean
      },
    },
    data() {
      return {
        myValue: [],
        open: false,
        keyword: {value: '', placeholder: '请输入查询关键词', required: false}
      }
    },
    computed: {
      checkedObj() {
        if (!this.myValue || this.myValue.length < 1) return {};
        return this.find(this.options, 0);
      },
      convertValue() {
        const checkObj = this.checkedObj;
        return checkObj && this.getName(checkObj)
      }
    },
    watch: {
      value(val) {
        this.myValue = val;
      }
    },
    methods: {
      find(arr, index) {
        const obj = deepCopy(arr || [])[this.myValue[index]] || {};
        if (obj.children && index >= this.myValue.length) return console.log('value数组的长度太短！') || {};
        if (obj.children && this.myValue[index + 1] !== undefined) obj.children = this.find(obj.children, index + 1);
        return obj
      },
      getName(obj) {
        let name = obj.name;
        if (typeof obj.children === 'object') {
          name += ' <span style="color:#ccc">-></span> ' + (this.getName(obj.children) || '');
        }
        return name
      },
      input(val) {
        this.open = false;
        this.myValue = val.path;
        this.$emit('input', val)
      },
      stopDefault
    },
    components: {'tree-menu': TreeMenu}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../css/common-variable.scss';

  .back {
    @include flex(center, center);
    width: .22rem;
    height: .22rem;

    & .icon-back {
      margin: 0;
    }
  }

  .linkage-wrap {
    @include flex(center, center);

    & .value {
      @include flex(center, center);
      justify-content: flex-end;
      width: 100%;
      text-align: right;

      &.no-value {
        color: $black-lighter;
      }

      & .icon-go {
        width: .1rem;
        height: .1rem;
        border-color: $black-lighter;
      }
    }

    & .select {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      overflow-y: auto;
      background: $background-1;

      & header {
        @include flex(space-between, center);
        height: .44rem;
        padding: 0 $margin;
        background: $blue-light;

        & h2 {
          @include flex(center, center);
          flex: 1;
          margin: 0 .22rem 0 0;
          @extend .content-4;
          color: #fff;
        }

        & input {
          flex: 1;
          width: 100%;
          height: .28rem;
          padding-left: .28rem;
          border-radius: .03rem;
          margin: 0 0 0 $margin;
          color: #fff;
          background: rgba(#000, .10) url('../../assets/icon-search.png') no-repeat left .07rem center;
          background-size: .14rem;

          &::-webkit-input-placeholder { /* WebKit browsers */
            color: rgba(#fff, .57);
          }

          &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: rgba(#fff, .57);
          }

          &::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: rgba(#fff, .57);
          }

          &:-ms-input-placeholder { /* Internet Explorer 10+ */
            color: rgba(#fff, .57);
          }
        }
      }
    }

    & .tips {
      display: block;
      width: 100%;
      text-align: center;
      margin: .3rem 0;
      color: $black-light;
    }
  }
</style>
