const path = require("path")
const { exec } = require('child_process');
const { CompositeDisposable } = require('atom')
const net = require('net');
const { DebugConsole, DebugConsoleView } = require('./console.js')

module.exports = {

  config: {
    "searchBling": {
      "description": "Flashy Border Animations identifying the location of other matches, when walking through the code using Shift-Ctrl-Up or Shift-Ctrl-Dn.",
      "type": "boolean",
      "default": true
    },

    "searchSound": {
      "description": "Sound when the search hits the end and can't search no moe, when walking through the code using Shift-Ctrl-Up or Shift-Ctrl-Dn.",
      "type": "boolean",
      "default": true
    },

    "includeFileioSnippets": {
      "description": "Include FileIO Code Snippets.",
      "type": "boolean",
      "default": true
    },

    "includeScreenioSnippets": {
      "description": "Include ScreenIO Code Snippets.",
      "type": "boolean",
      "default": true
    },

    "includeLexiSnippets": {
      "description": "Include Lexi Code Snippets.",
      "type": "boolean",
      "default": true
    },

    "lexiMenuOnTop": {
      "description": "Include a Lexi menu at the top level Windows menu.",
      "type": "boolean",
      "default": "true",
    },
  },

  toggleConsole(){
    if (!this.modalPanel.isVisible()){
      var brProcess = exec(`${this.lexiPath}\\brnative.exe "DEBUG CONNECT 127.0.0.1:${this.server.address().port}"`, {
        cwd: `${this.lexiPath}`
      },(err)=>{
        throw err
      });
      this.modalPanel.show()
    } else {
      this.modalPanel.hide()
    }
  },
  activate(state) {
    this.matches = [];
    this.lastSearch = "";
    this.fromWord = false;
    this.disposables = new CompositeDisposable();
    this.lexiPath = path.normalize(__dirname+"\\..\\Lexi")

    this.server = net.createServer((c) => {
      // 'connection' listener
      console.log('client connected');
      c.on('end', () => {
        c.destroy();
        console.log('client disconnected');
      });
      c.on('error', (err) => {
        c.destroy();
        throw err;
      })

      var msgCnt = 0
      c.on('data', (data) => {
        msgCnt += 1
        console.log("count:" + msgCnt)
        console.log(data.toString())
        // c.write (Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02")+Buffer.from(`st st >yyy`)+Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02"))
        if (msgCnt===2){
          c.write (Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02")+Buffer.from(`status >debug:262`)+Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02"))
        }
      })

      c.once('data', (data) => {
        c.write(Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02\x44\x45\x42\x55\x47\x20\x43\x4f\x4e\x53\x4f\x4c\x45\x20\x4f\x46\x46"))
      })
      // c.write(Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02")+Buffer.from("st st >xxx")+Buffer.from("\x00\x00\x00\x19\x00\x00\x00\x02"))

    })

    this.server.on('error', (err) => {
      // this.server.destroy();
      throw err;
    })

    this.server.listen({
      host: 'localhost',
      port: 0
      // exclusive: true
    },()=>{
      this.consoleView = new ConsoleView();
      this.modalPanel = atom.workspace.addBottomPanel({
        item: this.consoleView.getElement(),
        visible: false
      });
      atom.commands.add('atom-workspace', {
        'language-br:toggle-console': ()=>{
          this.toggleConsole()
        }
      })
    });

    atom.commands.add('atom-text-editor', {
      'next-occurrence:next': () => {
        this.init();
        return this.next();
      },
      'next-occurrence:prev': () => {
        this.init();
        return this.prev();
      }
    })

    if (atom.config.get("language-br.lexiMenuOnTop")){
      atom.menu.add([{
        "label": "Lexi",
        "submenu": [
          {
            "label": "Compile BR Program",
            "command": "language-br:compile"
          },
          {
            "label": "Debug BR Program",
            "command": "language-br:debug"
          },
          {
            "label": "Run BR Program",
            "command": "language-br:run"
          },
          {
            "label": "Add Line Numbers",
            "command": "language-br:add-line-numbers"
          },
          {
            "label": "Remove Line Numbers",
            "command": "language-br:strip-line-numbers"
          },
          {
            "label": "Set BR 4.2",
            "command": "language-br:set-br-42"
          },
          {
            "label": "Set BR 4.3",
            "command": "language-br:set-br-43"
          },
          {
            "label": "Search Wiki for Selected Text",
            "command": "language-br:lookupwiki"
          }
        ]
      }])
      atom.menu.update()
    }

    //
    atom.views.addViewProvider(DebugConsole, (model)=>{
      return new DebugConsoleView(model)
    })

    var debugConsole = new DebugConsole({
      output:"testout",
      command:"test"
    })
    // console.log(debugConsole)

    atom.workspace.addBottomPanel({
      item: debugConsole,
      visible: true
    })

    // atom.commands.add('atom-workspace', {
    //   'language-br:debug-console': () => {
    //     var pane = atom.workspace.getActivePane()
    //     var prog = pane.activeItem.getPath()
    //     if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
    //       var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
    //       exec(`${lexiPath}\\ConvStoO.cmd ${prog}`, {
    //         cwd: `${lexiPath}`
    //       });
    //     }
    //   }
    // })

    atom.commands.add('atom-workspace', {
      'language-br:compile': () => {
        var pane = atom.workspace.getActivePane()
        var prog = pane.activeItem.getPath()
        if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\ConvStoO.cmd ${prog}`, {
            cwd: `${lexiPath}`
          });
        }
      }
    })

    atom.commands.add('atom-workspace', {
      'language-br:run': () => {
        var pane = atom.workspace.getActivePane()
        var prog = pane.activeItem.getPath()
        if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\RunBR.cmd ${prog}`, {
            cwd: `${lexiPath}`
          });
        }
      }
    })

    atom.commands.add('atom-workspace', {
      'language-br:add-line-numbers': () => {
        var pane = atom.workspace.getActivePane()
        var prog = pane.activeItem.getPath()
        if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\AddLN.cmd ${prog}`, {
            cwd: `${lexiPath}`
          });
        }
      }
    })

    atom.commands.add('atom-workspace', {
      'language-br:strip-line-numbers': () => {
        var pane = atom.workspace.getActivePane()
        var prog = pane.activeItem.getPath()
        if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\StripLN.cmd ${prog}`, {
            cwd: `${lexiPath}`
          });
        }
      }
    })

    atom.commands.add('atom-workspace', {
      'language-br:set-br-42': () => {
        var pane = atom.workspace.getActivePane()
        var prog = pane.activeItem.getPath()
        if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\set42.cmd ${prog}`, {
            cwd: `${lexiPath}`
          });
        }
      }
    })

    atom.commands.add('atom-workspace', {
      'language-br:set-br-43': () => {
        var pane = atom.workspace.getActivePane()
        var prog = pane.activeItem.getPath()
        if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\set43.cmd ${prog}`, {
            cwd: `${lexiPath}`
          });
        }
      }
    })

    atom.commands.add('atom-workspace', {
      'language-br:lookupwiki': () => {
        var selection;
        this.editor = atom.workspace.getActiveTextEditor();
        selection = this.editor.getSelectedText();
        if (!selection) {
          this.editor.selectWordsContainingCursors();
          this.fromWord = true;
          selection = this.editor.getSelectedText();
        }
        // var pane = atom.workspace.getActivePane()
        // var prog = pane.activeItem.getPath()
        // if (path.extname(prog)===".brs" || path.extname(prog)===".wbs"){
          var lexiPath = path.normalize(__dirname+"\\..\\Lexi")
          exec(`${lexiPath}\\help.cmd ${selection}`, {
            cwd: `${lexiPath}`
          });
        // }
      }
    })




  },

  deactivate() {
    return this.disposables.dispose()
  },
  init() {
    var selection;
    this.editor = atom.workspace.getActiveTextEditor();
    selection = this.editor.getSelectedText();

    this.matches = [];

    if (selection.toLowerCase() !== this.lastSearch.toLowerCase()) {
      this.fromWord = false;
    }
    if (!selection) {
      this.editor.selectWordsContainingCursors();
      this.fromWord = true;
      selection = this.editor.getSelectedText();
    }

    if (!selection) {
      return;
    }
    selection = selection.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    this.lastSearch = selection;
    if (this.fromWord) {
      selection = '\\b' + selection + '\\b';
    }
    return this.editor.scan(new RegExp(selection, 'gi'), (o) => {

      if (atom.config.get('language-br.searchBling')) {
        o.marker = this.editor.markBufferRange(o.range, {
          invalidate: 'never'
        })

        o.decorator = this.editor.decorateMarker(o.marker, {
          type: "text",
          class: "occurence"
        })

        setTimeout(function () {
          o.marker.destroy()
        }, 500);
      }
      return this.matches.push(o);
    });
  },
  after(p1, p2, strict = true) {
    return p1.row === p2.row && (strict ? p1.column > p2.column : p1.column >= p2.column) || p1.row > p2.row;
  },
  next() {
    var cursor, match, ref;
    if (!(match = (ref = this.matches.slice(-1)[0]) != null ? ref.range.start : void 0)) {
      return;
    }

    cursor = this.editor.getCursorBufferPosition();
    if (this.after(cursor, match, false)) {
      // cursor =
      //   column: 0
      //   row: 0
      if (atom.config.get('language-br.searchBling')) {
         ref.decorator.setProperties({type: 'text', class: 'occurence-current-big'})
         // this.animateSelection('occurence-current-big')
      }

      if (atom.config.get('language-br.searchSound')) {
         return atom.beep();
      }
    } else {
      return this.lookup(cursor, 1);
    }
    this.disposables.dispose()
  },
  prev() {
    var cursor, match, ref;
    if (!(match = (ref = this.matches[0]) != null ? ref.range.end : void 0)) {
      return;
    }
    cursor = this.editor.getCursorBufferPosition();
    if (this.after(match, cursor, false)) {
      // cursor = @editor.getEofBufferPosition()

      if (atom.config.get('language-br.searchBling')) {
        // this.animateSelection('occurence-current-big')
        ref.decorator.setProperties({type: 'text', class: 'occurence-current-big'})
      }
      if (atom.config.get('language-br.searchSound')) {
        return atom.beep();
      }
    } else {

      return this.lookup(cursor, -1);
    }
  },
  lookup(cursor, step) {
    var i, len, match, ref, ref1, results;
    if (!this.matches.length) {
      return;
    }
    ref1 = this.matches;
    ref = step;
    results = [];
    for ((ref > 0 ? (i = 0, len = ref1.length) : i = ref1.length - 1); ref > 0 ? i < len : i >= 0; i += ref) {
      match = ref1[i];
      match = match.range;
      if ((step === 1 && this.after(match.start, cursor)) || (step === -1 && this.after(cursor, match.end))) {
        this.editor.setCursorBufferPosition([match.start.row, match.start.column]);
        this.editor.addSelectionForBufferRange([[match.start.row, match.start.column], [match.end.row, match.end.column]]);
        if (atom.config.get('language-br.searchBling')) {
          this.matches[i].decorator.setProperties({type: 'text', class: 'occurence-current'})
        }
        break;
      }
    }
  }
}
