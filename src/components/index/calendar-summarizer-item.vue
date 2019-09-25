<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    }
  },
  computed: {
    summaryNodes() {
      const [category, ...rest] = this.event.summary.split(':');
      return [category, rest.join(':')];
    },
  },
  render(_h) {
    const [title, message] = this.summaryNodes;

    const keyElement = message ? (<code>{ title }</code>) : (<span>{ title }</span>);
    const dividerElement = message && (<small>: </small>);
    const messageElement = message && (<span>{ message }</span>);

    return (
      <div title={this.event.summary}>
        { keyElement }{ dividerElement }{ messageElement }
      </div>
    );
  },
};
</script>
