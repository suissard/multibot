<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-hidden font-sans">
    <NotificationContainer />
    <NotificationHistory :show="showHistory" @close="showHistory = false" />

    <!-- Sidebar (Desktop) -->
    <aside
      class="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 shadow-xl z-20 transition-all duration-300 border-r border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">Multibot</h1>
      </div>
      <div class="flex-1 overflow-y-auto py-4">
        <nav class="space-y-1 px-3">
          <router-link to="/" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group mb-1">
            <svg class="w-5 h-5 mr-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="font-medium">Home</span>
          </router-link>

          <router-link to="/commands" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group mb-1">
            <svg class="w-5 h-5 mr-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">Commands</span>
          </router-link>

          <router-link to="/events" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group mb-1">
            <svg class="w-5 h-5 mr-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">Events</span>
          </router-link>

          <router-link to="/modules" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group mb-1">
            <svg class="w-5 h-5 mr-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span class="font-medium">Modules</span>
          </router-link>

          <router-link to="/secretary" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group mb-1">
            <svg class="w-5 h-5 mr-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="font-medium">Secretary</span>
          </router-link>

          <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"></div>

          <router-link to="/settings" active-class="bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400"
            class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group mb-1">
            <svg class="w-5 h-5 mr-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="font-medium">Settings</span>
          </router-link>
        </nav>
      </div>
    </aside>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col overflow-hidden relative">
      <!-- Top Header -->
      <header class="bg-white dark:bg-gray-800 shadow-md relative z-30 flex-shrink-0 h-16">
        <div class="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <!-- Mobile Menu Button -->
          <div class="flex items-center md:hidden">
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
              class="bg-white dark:bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span class="sr-only">Open main menu</span>
              <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Centered Bot & Channel Info -->
          <div class="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">

            <!-- Bot Selector -->
            <div class="relative">
              <div @click="toggleBotSelector"
                class="relative z-10 flex items-center bg-indigo-50 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-700 rounded-full py-1.5 px-4 shadow-sm cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors duration-200">
                <div v-if="selectedBot" class="flex items-center">
                  <img v-if="selectedBot.avatar" :src="selectedBot.avatar" alt="Bot Avatar"
                    class="h-8 w-8 rounded-full border border-indigo-200 dark:border-indigo-600 mr-2">
                  <div v-else
                    class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-2">
                    {{ (selectedBot.name || 'Unknown').charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm font-medium text-indigo-700 dark:text-indigo-200 hidden sm:block mr-1">{{
                    selectedBot.name }}</span>
                  <svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400 ml-1" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <span v-else
                  class="text-sm font-medium text-indigo-500 dark:text-indigo-400 italic hidden sm:block">Select
                  Bot</span>
              </div>

              <!-- Bot Dropdown -->
              <transition name="fade">
                <div v-if="showBotSelector"
                  class="absolute top-12 left-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-20">
                  <div v-if="bots && bots.length > 0">
                    <div v-for="bot in bots" :key="bot.id" @click="handleBotSelection(bot)"
                      class="flex items-center px-4 py-3 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      :class="{ 'bg-indigo-50/50 dark:bg-gray-700/50': selectedBotId === bot.id }">
                      <img v-if="bot.avatar" :src="bot.avatar" alt="Bot Avatar"
                        class="h-8 w-8 rounded-full mr-3 border border-gray-200 dark:border-gray-600">
                      <div v-else
                        class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3 text-xs">
                        {{ (bot.name || 'Unknown').charAt(0).toUpperCase() }}
                      </div>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ bot.name }}</span>
                      <span v-if="selectedBotId === bot.id" class="ml-auto text-indigo-600 dark:text-indigo-400">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
                    No bots available
                  </div>
                </div>
              </transition>
            </div>

            <!-- Channel Selector -->
            <div class="relative" v-if="selectedBot">
              <div @click="toggleChannelSelector"
                class="relative z-10 flex items-center bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-700 rounded-full py-1.5 px-4 shadow-sm cursor-pointer hover:bg-green-100 dark:hover:bg-green-800 transition-colors duration-200">
                <div v-if="selectedChannel" class="flex items-center">
                  <span class="text-sm font-medium text-green-700 dark:text-green-200 hidden sm:block mr-1"># {{
                    selectedChannel.name }}</span>
                  <svg class="w-4 h-4 text-green-500 dark:text-green-400 ml-1" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <span v-else
                  class="text-sm font-medium text-green-500 dark:text-green-400 italic hidden sm:block">Default
                  (DM)</span>
              </div>

              <!-- Channel Dropdown -->
              <transition name="fade">
                <div v-if="showChannelSelector"
                  class="absolute top-12 left-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-2 z-50 max-h-96 overflow-y-auto w-max min-w-full">
                  <div v-if="channels && channels.length > 0">
                    <!-- Option for No Channel (DM) -->
                    <div @click="handleChannelSelection(null)"
                      class="flex items-center px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 border-b border-gray-100 dark:border-gray-700">
                      <span class="text-sm font-medium text-gray-500 dark:text-gray-400 italic">No Channel
                        (Default/DM)</span>
                    </div>

                    <div v-for="channel in channels" :key="channel.id" @click="handleChannelSelection(channel)"
                      class="flex items-center px-4 py-3 hover:bg-green-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
                      :class="{ 'bg-green-50/50 dark:bg-gray-700/50': selectedChannelId === channel.id }">
                      <span class="text-gray-400 text-xs mr-2">#</span>
                      <span class="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{{ channel.name
                      }}</span>

                      <!-- Default Channel Star -->
                      <div class="ml-auto flex items-center space-x-2">
                        <button @click.stop="toggleDefaultChannel(channel.id)"
                          class="focus:outline-none transition-transform hover:scale-110"
                          :title="isDefaultChannel(channel.id) ? 'Unset Default' : 'Set as Default'">
                          <svg v-if="isDefaultChannel(channel.id)" class="w-4 h-4 text-yellow-500" fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                            </path>
                          </svg>
                          <svg v-else class="w-4 h-4 text-gray-300 hover:text-yellow-400" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                            </path>
                          </svg>
                        </button>

                        <span v-if="selectedChannelId === channel.id" class="text-green-600 dark:text-green-400">
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="px-4 py-3 text-sm text-gray-500 text-center">
                    No channels available
                  </div>
                </div>
              </transition>
            </div>

            <!-- Backdrop for closing -->
            <div v-if="showBotSelector || showChannelSelector" @click="toggleSettingsPanel"
              class="fixed inset-0 z-0 bg-transparent cursor-default"></div>
          </div>

          <!-- Notification Bell & User Settings (Right side) -->
          <div class="flex items-center space-x-4 ml-auto">
            <!-- Notification Bell -->
            <button @click="showHistory = !showHistory"
              class="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            <!-- Settings Toggle / Login -->
            <div v-if="isAuthenticated && user">
              <button @click="toggleSettingsPanel" class="flex items-center focus:outline-none ml-4">
                <img v-if="profilePictureUrl" :src="profilePictureUrl" alt="User Avatar"
                  class="h-9 w-9 rounded-full border-2 border-transparent hover:border-indigo-500 transition-colors duration-200 shadow-sm">
                <div v-else
                  class="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-sm font-bold">
                  {{ (user.username || 'User').charAt(0).toUpperCase() }}
                </div>
              </button>
            </div>
            <div v-else class="ml-4">
              <button @click="handleLogin"
                class="flex items-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 shadow-md">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                </svg>
                <span>Login</span>
              </button>
            </div>
          </div>

        </div>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- Mobile Menu Drawer (Modified for current context) -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true">
      <!-- Overlay -->
      <transition enter-active-class="transition-opacity ease-linear duration-300" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" @click="isMobileMenuOpen = false">
        </div>
      </transition>

      <!-- Drawer Panel -->
      <transition enter-active-class="transition ease-in-out duration-300 transform"
        enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform" leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full">
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl h-full">
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button @click="isMobileMenuOpen = false"
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Close sidebar</span>
              <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4 mb-5">
              <h2 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Multibot</h2>
            </div>
            <nav class="mt-5 px-2 space-y-1">
              <router-link to="/" @click="isMobileMenuOpen = false"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                Home
              </router-link>
              <router-link to="/commands" @click="isMobileMenuOpen = false"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                Commands
              </router-link>
              <router-link to="/events" @click="isMobileMenuOpen = false"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                Events
              </router-link>
              <router-link to="/modules" @click="isMobileMenuOpen = false"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                Modules
              </router-link>
              <router-link to="/secretary" @click="isMobileMenuOpen = false"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                Secretary
              </router-link>
              <router-link to="/settings" @click="isMobileMenuOpen = false"
                class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700">
                Settings
              </router-link>
            </nav>
          </div>
        </div>
      </transition>
    </div>

    <SettingsPanel :is-open="isSettingsPanelOpen" @close="toggleSettingsPanel" />
  </div>
</template>

<script>
import { useNotificationStore } from './stores/notifications';
import NotificationContainer from './components/NotificationContainer.vue';
import NotificationHistory from './components/NotificationHistory.vue';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from './stores/user';
import { useMainStore } from './stores/main';
import SettingsPanel from './components/SettingsPanel.vue';
import { callApi } from './services/callApi';

export default {
  name: 'App',
  components: {
    NotificationContainer,
    NotificationHistory,
    SettingsPanel
  },
  data() {
    return {
      isSettingsPanelOpen: false,
      showHistory: false,
      showBotSelector: false,
      showChannelSelector: false,
      isMobileMenuOpen: false,
      currentBotDefaultChannelId: null
    };
  },
  computed: {
    ...mapState(useUserStore, ['isAuthenticated', 'profilePictureUrl', 'theme', 'user']),
    ...mapState(useMainStore, ['selectedBotId', 'bots', 'channels', 'selectedChannelId']),
    selectedBot() {
      if (!this.selectedBotId || !this.bots) return null;
      return this.bots.find(bot => bot.id === this.selectedBotId);
    },
    selectedChannel() {
      if (!this.selectedChannelId || !this.channels) return null;
      return this.channels.find(c => c.id === this.selectedChannelId);
    }
  },
  methods: {
    ...mapActions(useUserStore, ['checkAuth', 'logout']),
    ...mapActions(useMainStore, ['fetchBots', 'selectBot', 'fetchChannels', 'selectChannel', 'setDefaultChannel']),
    toggleSettingsPanel() {
      this.isSettingsPanelOpen = !this.isSettingsPanelOpen;
      this.showBotSelector = false;
      this.showChannelSelector = false;
      this.isMobileMenuOpen = false;
    },
    toggleBotSelector() {
      this.showBotSelector = !this.showBotSelector;
      this.showChannelSelector = false;
      this.isSettingsPanelOpen = false;
    },
    toggleChannelSelector() {
      this.showChannelSelector = !this.showChannelSelector;
      this.showBotSelector = false;
      this.isSettingsPanelOpen = false;
    },
    async handleBotSelection(bot) {
      if (!bot) return;
      this.selectBot(bot.id);
      this.showBotSelector = false;
      // Refresh logic:
      await this.loadChannels(); // Fetch channels for new bot
      // Reload is a bit harsh if we can just react, but user asked for consistency. 
      // Reloading ensures all components reset. 
      window.location.reload();
    },
    async handleChannelSelection(channel) {
      if (!channel) {
        this.selectChannel(null);
      } else {
        this.selectChannel(channel.id);
      }
      this.showChannelSelector = false;
    },
    async loadChannels() {
      if (this.selectedBotId) {
        await this.fetchChannels();
        this.currentBotDefaultChannelId = localStorage.getItem(`default_channel_${this.selectedBotId}`);
      }
    },
    isDefaultChannel(channelId) {
      return this.currentBotDefaultChannelId === channelId;
    },
    toggleDefaultChannel(channelId) {
      if (!this.selectedBotId) return;
      if (this.isDefaultChannel(channelId)) {
        // Unset
        this.setDefaultChannel(this.selectedBotId, null);
        this.currentBotDefaultChannelId = null;
      } else {
        // Set
        this.setDefaultChannel(this.selectedBotId, channelId);
        this.currentBotDefaultChannelId = channelId;
      }
    },
    async handleLogin() {
      // Redirect to Discord OAuth
      window.location.href = await callApi('getDiscordAuthUrl');
    },
    logout() {
      const notificationStore = useNotificationStore();
      localStorage.removeItem('api_token');
      this.updateAuthStatus();
      this.$router.push('/login');
      notificationStore.addNotification({
        type: 'success',
        message: 'You have been logged out successfully.',
        duration: 5000,
        details: 'You will be redirected to the login page.'
      });
    }

  },
  created() {
    this.checkAuth().then(async () => {
      if (this.isAuthenticated) {
        await this.fetchBots();
        // Force load channels if bot is already selected (e.g. from localStorage)
        if (this.selectedBotId) {
          await this.loadChannels();
        }
      }
    });
  },
  watch: {
    // Reload channels when bot changes
    selectedBotId: 'loadChannels',
    // Reload channels (and bots) when auth status changes to true
    isAuthenticated: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.fetchBots().then(() => {
            if (this.selectedBotId) this.loadChannels();
          });
        }
      }
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
