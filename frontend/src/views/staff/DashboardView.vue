<template>
    <div class="container mt-4">
        <h2 class="mb-4 text-center">Bảng điều khiển nhân viên</h2>

        <div class="row g-4">
            <div class="col-md-6 col-xl-3" v-for="stat in stats" :key="stat.title">
                <div class="card shadow-sm text-center border-0 h-100">
                    <div class="card-body">
                        <div class="fs-1 text-primary mb-2">
                            <i :class="stat.icon"></i>
                        </div>
                        <h5 class="card-title">{{ stat.title }}</h5>
                        <p class="card-text fs-4 fw-bold">{{ stat.value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api.service'

export default {
    name: 'DashboardView',
    data() {
        return {
            stats: [
                { title: 'Sách', value: 0, icon: 'fas fa-book' },
                { title: 'Thể loại', value: 0, icon: 'fas fa-tags' },
                { title: 'NXB', value: 0, icon: 'fas fa-building' },
                { title: 'Yêu cầu mượn', value: 0, icon: 'fas fa-book-reader' }
            ]
        }
    },
    async created() {
        try {
            const [sach, theLoai, nxb, muon] = await Promise.all([
                api.get('/sach'),
                api.get('/theloai'),
                api.get('/nhaxuatban'),
                api.get('/muon/list/all')
            ])

            this.stats[0].value = sach.data.data.total || sach.data.data.length
            this.stats[1].value = theLoai.data.data.total || theLoai.data.data.length
            this.stats[2].value = nxb.data.data.total || nxb.data.data.length
            this.stats[3].value = muon.data.data.length
        } catch (err) {
            console.error('Lỗi tải thống kê:', err)
        }
    }
}
</script>

<style scoped>
.card-body {
    transition: transform 0.2s ease;
}

.card:hover .card-body {
    transform: scale(1.03);
}
</style>
