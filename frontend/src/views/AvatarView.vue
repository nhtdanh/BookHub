<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
            <h2 class="mb-4">Thay đổi ảnh đại diện</h2>
            <img :src="preview || profile.avatar || '/public/default-avatar.png'" class="rounded-circle mb-3"
                width="150" height="150" alt="avatar" />
            <form @submit.prevent="upload" enctype="multipart/form-data">
                <input @change="onFileChange" type="file" accept="image/*" class="form-control mb-3" />
                <button type="submit" class="btn" style="background-color: var(--color-btn)">
                    Tải lên
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'AvatarView',
    setup() {
        const router = useRouter()
        const profile = ref({})
        const file = ref(null)
        const preview = ref(null)

        const loadProfile = async () => {
            const { data } = await api.get('/docgia/me')
            profile.value = data
        }

        const onFileChange = e => {
            file.value = e.target.files[0]
            if (file.value) {
                preview.value = URL.createObjectURL(file.value)
            }
        }

        const upload = async () => {
            if (!file.value) return alert('Chọn file trước khi tải lên')
            const formData = new FormData()
            formData.append('avatar', file.value)
            await api.post('/docgia/me/avatar', formData)
            alert('Cập nhật avatar thành công')
            router.push({ name: 'Profile' })
        }

        onMounted(loadProfile)

        return { profile, preview, onFileChange, upload }
    }
}
</script>
