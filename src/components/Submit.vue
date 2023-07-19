<template>
  
  <div class="all">
    <h1>新闻发布</h1>

    <form class="form">

      <div class="line">
        <label for="title">title: </label>
        <input type="text" id="title" v-model="title" />
      </div>

      <div class="line">
        <label for="content">content: </label>
        <textarea id="content" v-model="content"></textarea>
      </div>

      <button @click="submitNews">submit</button>

    </form>
  </div>

</template>

<script>
  export default {
      data() {
          return {
              title: "", // 初始化，用于双向绑定
              content: ""
          };
      },

      methods: {
          submitNews() {
              // body是表单提交，应该创建一个FormData对象
              var formData = new FormData();
              // add form fields to formData
              formData.append('title', this.title); // 加 this
              formData.append('content', this.content);
              console.log(this.title);

              // 使用 fetch 发送 POST 请求到后端接口，fetch不兼容所有浏览器，vue+axios搭配
              fetch("http://localhost:82/articles", {
                  method:"POST",
                  body: formData // JSON.stringify(data)
              })
              .then(response => response.json().then(result => {
                  alert(result.message); 
                  console.log(result); // 控制台输出
                  // click ok and back to home page
                  if (result.message == "Success") {
                    this.$router.push({ path: '/' });
                  }
                  // alert(result); // 弹窗输出
                  
              }))
          }
      }
      
  };
</script>

<style>
  body {
      color: black;
      background-color: #ffc;
      margin: 20px;
      padding: 0;
  }

  .form{
      width: 100%;
      margin-top: 30px;
      text-align: center;
  }

  .form input{ /* title的form */
      border: solid 1px #ccc;
  }

  .form textarea{ /* content的form */
      border: solid 1px #ccc;
  }

  .line{
      margin-bottom: 20px;
  }

  .all h1 {
      color: #ffc;
      background-color: #0000FF;
      font-size: 2em;
      margin: 0 0 7px 0;
      padding: 4px;
      font-style: bold;
      text-align: center;
      letter-spacing: 0.5em;
      border-bottom-style: solid;
      border-bottom-width: 0.5em;
      border-bottom-color: #1E90FF;
  }

</style>
