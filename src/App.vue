<template>
  <el-container style="height: 100vh">
    <!-- 顶部导航栏 -->
    <el-header>
      <el-menu :default-active="$route.name" mode="horizontal">
        <!-- 使用 router-link 而不是手动 @click -->
        <router-link :to="{ name: 'home' }" custom v-slot="{ navigate, isActive }">
          <el-menu-item :index="'home'" @click="navigate" :class="{ 'is-active': isActive }">
            Home
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'merge' }" custom v-slot="{ navigate, isActive }">
          <el-menu-item :index="'merge'" @click="navigate" :class="{ 'is-active': isActive }">
            Merge PDF
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'split' }" custom v-slot="{ navigate, isActive }">
          <el-menu-item :index="'split'" @click="navigate" :class="{ 'is-active': isActive }">
            Split PDF
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'imageToPDF' }" custom v-slot="{ navigate, isActive }">
          <el-menu-item :index="'imageToPDF'" @click="navigate" :class="{ 'is-active': isActive }">
            Image to PDF
          </el-menu-item>
        </router-link>
        <router-link :to="{ name: 'about' }" custom v-slot="{ navigate, isActive }">
          <el-menu-item :index="'about'" @click="navigate" :class="{ 'is-active': isActive }">
            About
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-header>

    <!-- 主内容区：包含侧边栏和主要内容 -->
    <el-container>
      <!-- 侧边栏，左侧显示固定的段落 -->
      <el-aside width="250px" style="background-color: #f2f2f2; padding: 20px">
        <el-card>
          <h3>Welcome</h3>
          <p>
            Our website has just been established. If you have any requirements or suggestions,
            please feel free to send them to our email addresses: h835996498@qq.com or
            wiswang1988@gmail.com
          </p>
        </el-card>
      </el-aside>

      <!-- 主区域，右侧动态展示不同的页面内容 -->
      <el-main>
        <router-view></router-view>
        <!-- 路由组件展示 -->
      </el-main>
    </el-container>
  </el-container>
</template>
