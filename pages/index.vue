<template>
  <section class="homepage">
    <!-- Vue tag to add header component -->
    <header-prismic :menuLinks="menuLinks"/>
    <!-- Button to edit document in dashboard -->
    <prismic-edit-button :documentId="documentId"/>
    <a class="wio-link" target="https://vuejs-multi-page-example.cdn.prismic.io" :href="`https://vuejs-multi-page-example.prismic.io/app/documents/${documentId}/ref`"><img style="width: 16px; background: none;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpERjQ5QUU2RjNEMjA2ODExODhDNkNCNjMxRDc2RjgxMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNEVBRjk1MDJGRjIxMUUyOEMwOTk5MjNGNzE3MTFBNCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNEVBRjk0RjJGRjIxMUUyOEMwOTk5MjNGNzE3MTFBNCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTQ5NzEzQkEyNzIwNjgxMThGNjJCODhCQkREMUY0RkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REY0OUFFNkYzRDIwNjgxMTg4QzZDQjYzMUQ3NkY4MTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5adgfzAAABo0lEQVR42uybz2YDURSHb/8oXfUBSrddlW7zBqWrvkEppWQbSrahDF2FMISsssq2tFSqpEofoJRW32C6LCG053Avd3VNJneRc87vx0fInTHfmTh3bsx1Tl+OiQHxTfwRFTElCv+d2uwQpZdOUfqxqrJHvNaQD8w0FWFZ+cDQsjyzII62hMvfE62Gx29avfMxH5blmV+JBehlkmfmUuf7SaYCfErtAdy8xxkKcCO5EXIRRivI8zR4KKXhnSfGlA0LcCtB/i264MvE2P6S8lP/CxIjH2gnjilqyj8TuxLlA50Vpkjx8nWK0NUuH+gmztXRLh/oJc7ZjhqeSvlAkTj3mXb5QF/qqi6HfPxfn1n5wGjdH3Byr+dFTnWQhzzkIQ95yEMe8pCHPOQhD3nIQx7ykIc85CEPechDfn1yZ1meL3BuVZ5zalmeM7Asz3m3LH9gWZ5zZVmeM7Ysz29VVFblOS3L8pxry/KcmWu232aiQZ4XPwtXf5cVv5h44hTtvEw9/lb+Ll8Q+05htn0B4rwQT8Sj/6w6G76JfREPXvzHGcq/AAMAq1GE9ggQGt8AAAAASUVORK5CYII="></a>
    <!-- Banner component -->
    <homepage-banner :banner="banner"/>
    <!-- Slices block component -->
    <slices-block :slices="slices"/>
  </section>
</template>

<script>
import Prismic from "prismic-javascript"
import PrismicConfig from "~/prismic.config.js"
// Imports for all components
import HeaderPrismic from '~/components/HeaderPrismic.vue'
import HomepageBanner from '~/components/HomepageBanner.vue'
import SlicesBlock from '~/components/SlicesBlock.vue'

export default {
  name: 'Home',
  components: {
    HeaderPrismic,
    HomepageBanner,
    SlicesBlock,
  },
  head () {
    return {
      title: 'Prismic Nuxt.js Multi Page Website',
    }
  },
  async asyncData({context, error, req}) {
    try{
      // Fetching the API object
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint, {req})

      // Query to get the home page content
      let document = {}
      const result = await api.getSingle('homepage')
      document = result.data

      // Setting the banner as a variable
      let banner = document.homepage_banner[0]

      // Query to get the menu content
      let menuContent = {}
      const menu = await api.getSingle('menu')
      menuContent = menu.data

      // Load the edit button
      if (process.client) window.prismic.setupEditButton()

      return {
        // Page content
        document,
        documentId: result.id,
        banner,
        // Set slices as variable
        slices: document.page_content,

        // Menu
        menuContent,
        menuLinks: menuContent.menu_links
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
}
</script>
