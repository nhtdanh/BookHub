<!-- src/components/SearchBar.vue -->
<template>
    <div class="position-relative me-3" style="width: 250px;">
        <input v-model="query" @input="onInput" type="text" class="form-control form-control-sm"
            placeholder="Tìm sách..." @keydown.enter.prevent="goToFirst" />
        <ul v-if="showDropdown" class="dropdown-menu show w-100 mt-1 p-0 overflow-hidden" style="max-height: 300px;">
            <li v-for="book in suggestions" :key="book._id" class="dropdown-item list-item text-truncate"
                @click="goToDetail(book._id)" :title="book.tenSach">
                {{ truncate(book.tenSach, 30) }}
                <p><small class="text-muted"> {{ book.tacGia }}</small></p>
            </li>
            <li v-if="suggestions.length === 0" class="dropdown-item disabled text-center">
                Không có kết quả
            </li>
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api.service'

export default {
    name: 'SearchBar',
    setup() {
        const router = useRouter()
        const query = ref('')
        const suggestions = ref([])
        const showDropdown = ref(false)

        const fetchSuggestions = async (q) => {
            if (q.trim().length === 0) {
                suggestions.value = []
                return
            }
            try {
                const res = await api.get('/sach', { params: { search: q, limit: 3 } })
                suggestions.value = res.data.data.items || []
            } catch {
                suggestions.value = []
            }
        }

        const onInput = () => {
            showDropdown.value = true
            fetchSuggestions(query.value)
        }

        const goToDetail = (id) => {
            showDropdown.value = false
            router.push({ name: 'BookDetail', params: { id } })
        }

        const goToFirst = () => {
            if (suggestions.value.length > 0) {
                goToDetail(suggestions.value[0]._id)
            }
        }

        // helper truncate
        const truncate = (str, max) => {
            return str.length > max ? str.slice(0, max) + '…' : str
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.position-relative')) {
                showDropdown.value = false
            }
        })

        return { query, suggestions, showDropdown, onInput, goToDetail, goToFirst, truncate }
    }
}
</script>

<style scoped>
.list-item {
    cursor: pointer;
    white-space: nowrap;
}

.list-item:hover {
    background-color: #f4f1ea;
}
</style>
