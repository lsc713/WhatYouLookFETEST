<template>
    <div class="clothes-recommend">
        <h3>오늘의 옷 추천</h3>
        <div v-if="clothesStore.clothes.length > 0">
            <div class="row">
                <div class="col-3">
                    <h4>상의</h4>
                    <ul class="list-unstyled">
                        <li v-for="top in tops" :key="top.id">
                            {{ top.name }}
                        </li>
                    </ul>
                </div>
                <div class="col-3">
                    <h4>하의</h4>
                    <ul class="list-unstyled">
                        <li v-for="bottom in bottoms" :key="bottom.id">
                            {{ bottom.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else>
            <p>추천할 옷이 없습니다.</p>
        </div>
    </div>
</template>
   
<script setup>
import { computed } from 'vue'
import { useClothStore } from '@/stores/cloth'

const clothesStore = useClothStore()

const tops = computed(() =>
    clothesStore.clothes.filter(cloth => cloth.type === 'TOP')
)

const bottoms = computed(() =>
    clothesStore.clothes.filter(cloth => cloth.type === 'BOTTOM')
)
</script>