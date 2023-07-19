<template>
  <div>
    <header>
      <h1>头部（随窗口大小弹性）</h1>
    </header>

    <main>
      <side>
        侧边栏（固定宽）

        <nav>
          <ul>
            <!-- <li>
              <router-link :to="{name: 'articleList'}">Article Lists</router-link>
            </li> 
            <li>
              <router-link :to="{name: 'submitNews'}">Submit News</router-link>
            </li> -->

            <li>
              <a href="#/">Article Lists</a>
            </li>
            <li>
              <a href="#/submit">Submit News</a>
            </li>

          </ul>
        </nav>

      </side>

      <div class="content-wrapper">

        <table border="solid black" width="90%">
          <tr>
            <th>ID</th>
            <th>title</th>
            <th>content</th>
            <th>created_at</th>
          </tr>

          <!-- 
            v-for 使用 item in items，其中 items 是源数据的数组，item 是迭代项的别名 
          -->
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.created_at }}</td> <!-- created_at要和postman里result.data.list的created_at名字一样-->
          </tr>
        </table>

        <!-- 用element-Plus实现分页 -->
        <div class="Pagination">
          <!-- <span class="demonstration">大于 7 页时的效果</span> -->
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next"
            :total="pageSize * totalPages">
          </el-pagination>
        </div>
      </div>

      <!-- <div id="button">
        <button>固定按钮</button>
      </div> -->

      <div id="button">
        <router-link :to="{ path: '/submit' }"><button>button</button></router-link>
      </div>

    </main>

    <footer>
      <p>底部（随窗口大小弹性）</p>
    </footer>
  </div>
</template>

<script>
// import { RouterLink } from '../router/routes.js';

export default {
  data() {
    return {
      items: [],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据数量
      totalPages: 10, // 总页数
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    fetchItems() {
      fetch('http://localhost:82/articles/pages/' + this.currentPage)
        // fetch('http://localhost:82/articles/pages/1') 
        .then(response => {
          response.json().then(result => { // response.json()是个promise，所以要继续 then(result => {
            console.log(result);
            if (response.status == 200) {
              this.items = result.data.list;
              this.currentPage = result.data.page;
              this.pageSize = result.data.pageSize;
              this.totalPages = result.data.totalPages;
            } else {
              alert(result.message)
            }
          })
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
      },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.fetchItems();
    },
  },
};
</script>

<style scoped>
header {
  background-color: #0000FF; /* color code: https://www.w3schools.com/cssref/css_colors.php */
  flex: 1 1 auto;
  padding: 20px;
  text-align: center;
  color: #ffc;
}

main {
  flex: 1 0 auto;
  display: flex;
  background-color: #FFFFFF;
  margin-top: 10px;
  margin-bottom: 10px;
}

side {
  width: 200px;
  /* 侧边栏固定宽度 */
  background-color: #ADD8E6;
  margin-right: 5px;
  padding: 10px;
  text-align: center;
}

.content-wrapper {
  /* 
    flex-grow = 1: The div will grow in same proportion as the window-size; 
    flex-shrink = 1: The div will shrink in same proportion as the window-size. 
    */
  flex: 1 1 auto;
  background-color:  #ADD8E6;
}


.Pagination {
  margin-top: 20px;
}

button {
  position: fixed;
  background-color: #FF8C00;
  border: #FF8C00;
  text-align: center;
  top: 50%;
  right: 20px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}


footer {
  background-color: #0000FF;
  flex: 1 1 auto;
  padding: 20px;
  text-align: center;
  color: #ffc
}

</style>