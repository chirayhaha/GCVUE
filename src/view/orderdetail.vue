<template>
    <div class="orderdetail">
        <div class="top">
            <back></back>
            <span class="title">订单详情</span>
        </div>
        <div class="sid"><span>{{orderinfo[0].storeid}}</span></div>
        <div class="add">
            <span>{{orderinfo[0].address}}</span>
            <span></span>
            <span class="phone">{{orderinfo[0].conphone}}</span>
        </div>
        <div class="middle" v-for="(order,index) in orderinfo" :key="index">
            <div class="good">
                <span class="name">{{order.foodname}} </span>
                <span class="num"> x{{order.ordernum}}</span>
            </div>
            
        </div>
        <div class="bottom">
            <p class="total">合计：￥{{orderinfo[0].total}}</p>
            <p class="orderid">订单编号:{{orderinfo[0].orderid}} </p>
        </div>

    </div>
</template>

<script>
import back from '../components/back';

    export default {
        name:'orderdetail',
        data(){
            return{
                orderinfo:[]
            }
        },
        components:{back},
        methods:{
            orderdetail(){
                let orderid = this.$route.params
                this.$api.user.orderdetail(orderid).then(res=>{
                    this.orderinfo = res.data
                })
            }
        },
        created(){
            this.orderdetail()
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;overflow-x: hidden;}
.top{
    height: 50px;
    text-align: center;
    border-bottom: 0.1px solid rgb(138, 138, 57);
    margin-bottom: 10px;
}
.title{
    font-size: 25px;
    color: rgb(150, 150, 63);
}
.sid{font-weight: bolder;color: rgb(121, 121, 58);}
.add{
    /* border-top: 0.1px solid rgb(206, 206, 175); */
    border-bottom: 0.1px solid rgb(206, 206, 175);
    height: 50px;
    padding: 10px 20px;
    line-height: 1.5rem;
    margin-top: 20px;
}
.middle{background-color: rgb(255, 255, 235);margin-top: 20px;}
.good{
    height: 55px;
    padding: 5px 15px;
    background-color: white;
}
.good .name{
    position: relative;
    top: 10px;
}
.good .num{
    position: relative;
    top: 10px;
}
.bottom{
    height: 50px;
    background-color: rgb(253, 250, 218);
    padding: 10px 15px;
    text-align: right;
    line-height: 1.5rem;
}
</style>