<template>
    <div class="searchbook">
        <div class="input">
            <el-input v-model="bookname" prefix-icon="el-icon-search" 
            placeholder="请输入食谱关键字" class="sinput" 
            @keyup.enter.native ="searchbook"></el-input>
            <i class="el-icon-search" @click="searchbook"></i>
        </div>
        <span class="sres" v-if="res">搜索到‘{{bookname}}’相关食谱{{books.length}}条</span>
        <div class="middle" v-for="(book,index) in books" :key="index">
            <router-link :to="'/cookbooks/'+book.title+'/'+book.userid">
                <div class="result">
                    <p style="color: rgb(177, 177, 43);">{{book.title}}</p>
                    <p style="color: rgb(175, 175, 135);">材料：{{book.context}}</p>
                    <p style="color: rgb(175, 175, 135);">做法：{{book.making}}</p>
                </div>
            </router-link>
        </div>
        <div class="none" v-if="none">暂无相关食谱，欢迎补充噢！</div>
    </div>
</template>

<script>
    export default {
        name:'searchbook',
        data(){
            return{
                bookname:'',
                books:[],
                none:false,
                res:false
            }
        },
        methods:{
            searchbook(){
                let bookname = this.bookname
                this.$api.user.searchbook(bookname).then(res=>{
                    if(res.data.length>0){
                        this.books = res.data
                        this.res = true
                    }
                    else{
                        this.none = true
                    }
                })
            }
        }
    }
</script>

<style scoped>
*{padding: 0;margin: 0;}
.sinput{
    width: 190px;
    margin-right: 10px;
}
.input{
    position: relative;
    left: 135px;
    bottom: 30px;
}
.middle{
    position: relative;
    top: -10px;
}
.result{
    height: 60px;
    border-bottom: 0.1px solid rgb(154, 155, 93);
    padding: 3px 5px;
    margin: 5px 15px;
}
p{
    height: 1.1rem;
    overflow: hidden;
    
}
.sres{
    font-size: 12px;
    color: rgb(158, 158, 141);
    position: relative;
    top: -15px;
    margin-left: 18px;
}
a{
  text-decoration: none;
  font-family: '幼圆';
}
</style>