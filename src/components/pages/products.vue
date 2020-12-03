<template>
<div>
     <loading :active.sync="isLoading" ></loading>
  <div class="text-right">
   <button type="button" class="btn btn-primary mt-2" @click.prevent="modalopen(true)">建立新產品</button>
  </div>
  <table class="table mt-4">
    <thead class="text-center">
      <tr>
        <th width="120">分類</th>
        <th width="120">產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="120">是否啟用</th>
        <th width="120">編輯、刪除</th>
      </tr>
    </thead>
     <tbody class="text-center">
       <tr v-for="(item) in products" :key="item.id">
         <td>{{item.category}}</td>
         <td>{{item.title}}</td>
         <td class="text-right">{{item.origin_price |currency}}</td>
         <td class="text-right">{{item.price | currency}}</td>
         <td>
           <span v-if="item.is_enabled" class="text-success">啟用</span>
           <span v-else>未啟用</span>
         </td>
         <td>
           <button type="button" class="btn btn-primary" @click.prevent="modalopen(true,item)">編輯</button>
           <button type="button" class="btn btn-danger" @click.prevent="remove(item)">刪除</button>
         </td>
       </tr>
     </tbody>
  </table>
      <nav aria-label="Page navigation example">
      <ul class="pagination">

        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" @click.prevent="getProdcuts(pagination.current_page-1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
        :class="{'active':pagination.current_page === page}">
          <a class="page-link" href="#" @click.prevent="getProdcuts(page)" >{{ page }}</a></li>
        
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" @click.prevent="getProdcuts(pagination.current_page+1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

      </ul>
    </nav>
  <!-- Modal -->
<div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input type="text" class="form-control" id="image"
                placeholder="請輸入圖片連結"  v-model="tempProduct.imageUrl">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <i class="fas fa-spinner fa-spin"></i>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files"  @change="uploadfile">
            </div>
            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
              class="img-fluid" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                placeholder="請輸入標題">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category"
                  placeholder="請輸入分類" v-model="tempProduct.category">
              </div>
              <div class="form-group col-md-6">
                <label for="unit">單位</label>
                <input type="unit" class="form-control" id="unit"
                  placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price"
                  placeholder="請輸入原價" v-model="tempProduct.origin_price">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price"
                  placeholder="請輸入售價" v-model="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description"
                placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content"
                placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  id="is_enabled" 
                  v-model="tempProduct.is_enabled"
                  :true-value="1"
                  :false-value="0">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="updateproduct">確認</button>
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="removemodal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除 <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-danger" @click.prevent="removedata()"
          >確認刪除</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
     products:[],
     tempProduct:{},
     isNew:false,
     isLoading:false,
     pagination:{},
    }
  },
  methods:{
    getProdcuts(page=1){
    const api=`${process.env.AIRPATH}/api/brian92292/products?page=${page}`;
    const vm=this;
    vm.isLoading=true;
    this.$http.get(api).then((response) => {
    console.log(response.data)
    vm.products=response.data.products;
    vm.pagination=response.data.pagination;
    console.log(vm.products);
    vm.isLoading=false;
  }
  )},

   modalopen(isNew,item){
     if(isNew){
       this.tempProduct={};
       this.isNew=true;
     }
     else{
       this.tempProduct=Object.assign({},item);
       this.isNew=false;
     }
     $('#productModal').modal('show');
   },
   updateproduct(){
     //new
     let api=`${process.env.AIRPATH}/api/brian92292/admin/product`;
     let httpmethod='post';
     const vm=this;
     //renew
     if(!vm.isNew){
       let api=`${process.env.AIRPATH}/api/brian92292/admin/product/${vm.tempProduct.id}`;
       let httpmethod='put';
     }
     this.$http[httpmethod](api,{data:vm.tempProduct}).then((response) => {
     console.log(response.data)
     if(response.data.success){
       console.log('success');
       $('#productModal').modal('hide');
       vm.getProdcuts();
     }

     }
   )},
   uploadfile(){
     console.log(this);
     const uploadfile=this.$ref.files.files[0];
     const vm=this;
     const formData=new FormData();
     formData.append('file-to-upload',uploadfile);
     const url=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
     this.$http.post(url,formData,{headers:{'Content-type':'multipart/form-data'}}).then((response) => {
     console.log(response.data);
     if(response.data.success){
       vm.tempProduct.imageUrl=response.data.imageUrl;
       console.log(vm.products);
       vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
     }

   }
    )},
    remove(item){
      this.tempProduct=Object.assign({},item);
      console.log('removedata',this.tempProduct);
      $('#removemodal').modal('show');
      
    },
    removedata(){
      const vm=this;
      console.log('remove data id',vm.tempProduct.id);
      vm.isLoading=true;
      const api=`${process.env.AIRPATH}/api/brian92292/admin/product/${vm.tempProduct.id}`;
        this.$http.delete(api).then((response) => {
        console.log(response.data);
        console.log('remove success');
        vm.isLoading=false;
        $('#removemodal').modal('hide');
        vm.getProdcuts();
    }
  )}

  },
  created(){
      this.getProdcuts();
      console.log('here');
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
