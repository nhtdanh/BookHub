<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
            <h2 class="mb-4">Thay đổi ảnh đại diện</h2>
            <img :src="avatarUrl" class="rounded-circle mb-3" width="150" height="150" alt="avatar" />
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
import api from '@/services/api.service'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const backendBaseURL = import.meta.env.VITE_API_URL.replace('/api/v1', '')

export default {
    name: 'AvatarView',
    setup() {
        const router = useRouter()
        const profile = ref({})
        const file = ref(null)
        const preview = ref(null)

        const avatarUrl = computed(() => {
            return preview.value
                ? preview.value
                : profile.value.anhDaiDien
                    ? `${backendBaseURL}${profile.value.anhDaiDien}`
                    : '/default.jpg'
        })

        const loadProfile = async () => {
            const { data } = await api.get('/docgia/me')
            profile.value = data.data
        }

        const onFileChange = (e) => {
            file.value = e.target.files[0]
            if (file.value) {
                preview.value = URL.createObjectURL(file.value)
            }
        }

        const upload = async () => {
            if (!file.value) return alert('Chọn file trước khi tải lên')

            const formData = new FormData()
            formData.append('avatar', file.value)
            console.log(file.value)
            console.log(formData)

            try {
                await api.post('/docgia/me/avatar', formData)
                alert('Cập nhật avatar thành công')
                router.push({ name: 'Profile' })
            } catch (err) {
                alert('Lỗi khi cập nhật ảnh đại diện')
                console.error(err)
            }
        }

        onMounted(loadProfile)

        return {
            profile,
            preview,
            avatarUrl,
            onFileChange,
            upload
        }
    }
}
</script>

