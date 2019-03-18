<template>
  <div class="pdf-viewer-wrap">
    <pdf v-for="i in numPages" class="pdf" :key="i" :src="pdfSrc" :page="i" />
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: 'PDFViewer',
  components: { pdf },
  props: {
    src: [String, Object],
  },
  data() {
    return {
      numPages: null,
    }
  },
  computed: {
    pdfSrc() {
      return pdf.createLoadingTask(this.src)
    },
  },
  methods: {
    getTotalPages() {
      this.pdfSrc.then(pdfObj => {
        this.numPages = pdfObj.numPages
      })
    },
  },
  mounted() {
    this.getTotalPages()
  },
}
</script>
