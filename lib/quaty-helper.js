'use babel';

import QuatyHelperView from './quaty-helper-view';
import { CompositeDisposable } from 'atom';

export default {

  quatyHelperView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.quatyHelperView = new QuatyHelperView(state.quatyHelperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.quatyHelperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'quaty-helper:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.quatyHelperView.destroy();
  },

  serialize() {
    return {
      quatyHelperViewState: this.quatyHelperView.serialize()
    };
  },

  toggle() {
    console.log('QuatyHelper was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
