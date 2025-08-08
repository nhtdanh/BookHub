<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
            <h2 class="mb-4">Thay đổi ảnh đại diện</h2>

            <!-- Ảnh hiện tại hoặc preview -->
            <img :src="avatarUrl" class="rounded-circle mb-3" width="150" height="150" alt="avatar" />

            <form @submit.prevent="upload" enctype="multipart/form-data">
                <input @change="onFileChange" ref="fileInput" type="file" accept="image/*" class="form-control mb-3" />
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
        const fileInput = ref(null)

        // Ảnh hiển thị: ưu tiên preview, sau đó ảnh từ server, nếu không thì default
        const avatarUrl = computed(() => {
            return preview.value
                ? preview.value
                : profile.value.anhDaiDien
                    ? `${backendBaseURL}${profile.value.anhDaiDien}`
                    : '/default.jpg'
        })

        // Lấy thông tin hồ sơ
        const loadProfile = async () => {
            try {
                const { data } = await api.get('/docgia/me')
                profile.value = data.data
            } catch (err) {
                console.error('Lỗi khi load profile', err)
            }
        }

        // Khi chọn file
        const onFileChange = (e) => {
            const selectedFile = e.target.files[0]
            if (selectedFile) {
                file.value = selectedFile
                preview.value = URL.createObjectURL(selectedFile)
            }
        }

        // Upload avatar
        const upload = async () => {
            if (!file.value) {
                alert('Chọn file trước khi tải lên')
                return
            }

            const formData = new FormData()
            formData.append('avatar', file.value)

            try {
                await api.post('/docgia/me/avatar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                alert('Cập nhật avatar thành công')

                // Reset input file để có thể chọn lại cùng file
                if (fileInput.value) fileInput.value.value = ''

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
            upload,
            fileInput
        }
    }
}
</script>
