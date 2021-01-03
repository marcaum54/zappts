'use strict';

class LetterStore extends use('./Base') {
  get rules() {
    return {
      title: 'required',
      body: 'required',
    };
  }
}

module.exports = LetterStore;
