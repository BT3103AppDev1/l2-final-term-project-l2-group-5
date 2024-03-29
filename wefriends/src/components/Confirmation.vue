<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
                <h3>{{ title }}</h3>
            </div>
            <div class="modal-body">
                <p>{{ message }}</p>
            </div>
            <div class="modal-footer">
                <p @click="confirm">Confirm</p>
                <p @click="cancel">Cancel</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: Boolean,
        title: String,
        message: String
    },
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            this.$emit('cancel');
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
}

.modal-header h3 {
    margin: 0;
}

.modal-body p {
    margin: 20px 0;
}

.modal-footer {
    text-align: right;
    display: flex;
    justify-content: right;
    margin-top: 30px;
}

.modal-footer p {
    margin-left: 20px;
    margin-bottom: 0;
    padding: 5px;
}

.modal-footer p:hover {
    background-color: #b8b8b8;
    border-radius: 12px;
    cursor: pointer;
}
</style>