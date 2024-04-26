import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
// piniaPluginPersistedstate: pinia数据持久化插件
pinia.use(piniaPluginPersistedstate);
export default pinia;
