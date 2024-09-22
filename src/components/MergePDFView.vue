<template>
  <div class="merge-pdf-container">
    <el-upload
      class="upload-demo"
      drag
      action="#"
      multiple
      :auto-upload="false"
      :on-change="handleFileChange"
      :on-remove="handleFileRemove"
      :file-list="fileList"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop PDF files here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">Only PDF files are allowed</div>
      </template>
    </el-upload>

    <el-button type="primary" @click="mergePDFs" :loading="merging" :disabled="fileList.length < 2">
      Merge PDFs ({{ fileList.length }} files selected)
    </el-button>

    <el-progress v-if="merging" :percentage="mergeProgress" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { PDFDocument } from 'pdf-lib'

export default {
  name: 'MergePDF',
  components: {
    UploadFilled
  },
  setup() {
    const fileList = ref([])
    const merging = ref(false)
    const mergeProgress = ref(0)

    const handleFileChange = (file, uploadFileList) => {
      if (file.raw.type !== 'application/pdf') {
        ElMessage.error('Only PDF files are allowed!')
        return
      }
      fileList.value = uploadFileList.filter((f) => f.raw.type === 'application/pdf')
    }

    const handleFileRemove = (file, uploadFileList) => {
      fileList.value = uploadFileList
    }

    const mergePDFs = async () => {
      if (fileList.value.length < 2) {
        ElMessage.warning('Please upload at least two PDF files')
        return
      }

      merging.value = true
      mergeProgress.value = 0

      try {
        const mergedPdf = await PDFDocument.create()
        const totalFiles = fileList.value.length

        for (let i = 0; i < totalFiles; i++) {
          const file = fileList.value[i].raw
          const arrayBuffer = await file.arrayBuffer()
          const pdf = await PDFDocument.load(arrayBuffer)
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
          copiedPages.forEach((page) => mergedPdf.addPage(page))

          mergeProgress.value = Math.round(((i + 1) / totalFiles) * 100)
        }

        const pdfBytes = await mergedPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'merged.pdf'
        link.click()

        ElMessage.success('PDFs merged successfully. Downloading...')
      } catch (error) {
        console.error('Error merging PDFs:', error)
        ElMessage.error('An error occurred during the merging process')
      } finally {
        merging.value = false
      }
    }

    // 用于调试
    watch(fileList, (newValue) => {
      console.log('fileList updated:', newValue)
    })

    return {
      fileList,
      merging,
      mergeProgress,
      handleFileChange,
      handleFileRemove,
      mergePDFs
    }
  }
}
</script>

<style scoped>
.merge-pdf-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.el-upload__tip {
  margin-top: 10px;
}

.el-button {
  margin-top: 20px;
  width: 100%;
}

.el-progress {
  margin-top: 20px;
}
</style>
