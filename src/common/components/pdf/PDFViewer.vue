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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.pdf-viewer-wrap {
  width: 100%;
  padding: 0.3rem;
  background: #666;

  .pdf {
    margin: 0 0 $margin;
    box-shadow: 0 0.05rem 0.1rem rgba(#000, 0.25);

    &:last-of-type {
      margin: 0;
    }
  }
}
</style>
