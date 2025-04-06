import MouseFollower from '../core/mouse-follower.js';

class Cursor {
  static setCursor() {
    if (this.cursor) {
      this.cursor.destroy();
    }

    this.cursor = new MouseFollower({
      stateDetection: {
        container: 'body',
        // '-pointer': '.no-btn',
      },
    });

    document.querySelectorAll('[data-cursor-skewing]').forEach((el) => {
      const skewing = Number(el.dataset.cursorSkewing) || 3;
      el.addEventListener('mouseenter', () => {
        this.cursor.setSkewing(skewing);
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.removeSkewing();
      });
    });
  }
}

export default Cursor;
