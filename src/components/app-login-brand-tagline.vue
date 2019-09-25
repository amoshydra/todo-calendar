<script>

const makeTaglineWrapper = (element, index, arr, renderer, context) => {
  if (!element) { return []; }

  const previousLength = arr.slice(0, index).join(' ').length + 1;
  const preTypeDelay = context.preTypeDelay + (previousLength * context.typeDelay);

  const nextIndex = index + 1;
  return [
    renderer('div', {
      staticClass: 'app-login-brand-tagline__wrapper',
    }, [
      renderer(context.vueTyper, {
        props: {
          preTypeDelay,
          typeDelay: context.typeDelay,
          text: `${element} `,
          repeat: 0,
        }
      }),
      ...makeTaglineWrapper(arr[nextIndex], nextIndex, arr, renderer, context),
    ])
  ];
};
const makeTagLine = (renderer, context, lines) => makeTaglineWrapper(lines[0], 0, lines, renderer, context);

export default {
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    typeDelay: {
      type: Number,
      default: 80,
    },
    preTypeDelay: {
      type: Number,
      default: 1000,
    },
    lines: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      vueTyper: null,
    };
  },
  async mounted() {
    const { VueTyper } = await import('vue-typer');
    this.vueTyper = VueTyper;
  },
  render(h) {
    const children = this.vueTyper
      ? makeTagLine(h, this, this.lines)
      : []
    ;

    return h(
      this.tagName,
      {
        staticClass: 'app-login-brand-tagline'
      },
      children,
    );
  },
};
</script>

<style scoped>
.app-login-brand-tagline {
  opacity: 0.4;
  font-weight: 900;
  min-height: 3em;
}
.app-login-brand-tagline {
  font-family: 'Kalam', cursive;
  line-height: 1.2em;
}
.app-login-brand-tagline .app-login-brand-tagline__wrapper {
  display: inline-block;
}
</style>
