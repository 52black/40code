var ExampleExtension = function () {
};

/**
 * @return {object} This extension's metadata.
 */
ExampleExtension.prototype.getInfo = function () {
    return {
        // Required: the machine-readable name of this extension.
        // Will be used as the extension's namespace. Must not contain a '.' character.
        //必需：此扩展的机器可读名称。//将用作扩展的命名空间。不能包含“.”字符。
        id: 'someBlocks',

        // Optional: the human-readable name of this extension as string.
        // This and any other string to be displayed in the Scratch UI may either be
        // a string or a call to `intlDefineMessage`; a plain string will not be
        // translated whereas a call to `intlDefineMessage` will connect the string
        // to the translation map (see below). The `intlDefineMessage` call is
        // similar to `defineMessages` from `react-intl` in form, but will actually
        // call some extension support code to do its magic. For example, we will
        // internally namespace the messages such that two extensions could have
        // messages with the same ID without colliding.
        // See also: https://github.com/yahoo/react-intl/wiki/API#definemessages
        //可选：此扩展名的可读名称为字符串。
        //此字符串和任何其他要显示在Scratch UI中的字符串可以是
        //字符串，也可以是对`intlDefineMessage`的调用；普通字符串将不会被
        //翻译，而对`intlDefineMessage`的调用将把字符串
        //连接到翻译映射（见下文）。`intlDefineMessage`调用
        //。例如，我们将//internal为消息命名，这样两个扩展就可以
        //messages具有相同的ID而不会发生冲突。
        //另请参见：https://github.com/yahoo/react intl/wiki/API#定义消息
        name: 'Some Blocks',

        // Optional: URI for an icon for this extension. Data URI OK.
        // If not present, use a generic icon.
        // TODO: what file types are OK? All web images? Just PNG?
        //可选：此扩展的图标的URI。数据URI正常。//如果不存在，请使用通用图标。//TODO:什么文件类型可以？所有网络图像？只是PNG？
        iconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAAAAACyOJm3AAAAFklEQVQYV2P4DwMMEMgAI/+DE' +
            'UIMBgAEWB7i7uidhAAAAABJRU5ErkJggg==',

        //可选：链接到此扩展的文档内容。//如果不存在，则不提供链接。
        docsURI: 'https://....',

        // Required: the list of blocks implemented by this extension,
        // in the order intended for display.
        //Required:此扩展实现的块列表，//按显示顺序。
        blocks: [
            {
                opcode: 'example-noop',
                blockType: Scratch.BlockType.COMMAND,
                blockAllThreads: false,
                text: 'do nothing',
                func: 'noop'
            },
            {
                opcode: 'example-conditional',
                blockType: Scratch.BlockType.CONDITIONAL,
                branchCount: 4,
                isTerminal: true,
                blockAllThreads: false,
                text: 'choose [BRANCH]',
                arguments: {
                    BRANCH: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 1
                    }
                },
                func: 'noop'
            },
            {
                // Required: the machine-readable name of this operation.
                // This will appear in project JSON. Must not contain a '.' character.
                //必需：此操作的机器可读名称。//这将出现在projectjson中。不能包含“.”字符。
                opcode: 'myReporter', // becomes 'someBlocks.myReporter' 变成

                // Required: the kind of block we're defining, from a predefined list:
                // 'command' - a normal command block, like "move {} steps"
                // 'reporter' - returns a value, like "direction"
                // 'Boolean' - same as 'reporter' but returns a Boolean value
                // 'hat' - starts a stack if its value is truthy
                // 'conditional' - control flow, like "if {}" or "repeat {}"
                // A 'conditional' block may return the one-based index of a branch
                // to run, or it may return zero/falsy to run no branch. Each time a
                // child branch finishes, the block is called again. This is only a
                // slight change to the current model for control flow blocks, and is
                // also compatible with returning true/false for an "if" or "repeat"
                // block.
                // TODO: Consider Blockly-like nextStatement, previousStatement, and
                // output attributes as an alternative. Those are more flexible, but
                // allow bad combinations.
                //必需：从预定义列表中定义的块类型：
                //“command”-普通命令块，如"move{} steps"
                //“reporter”-返回值，如"direction"
                //“Boolean”-与“reporter”相同，但返回布尔值
                //“hat”-如果其值为truthy
                //“conditional”-控制流，则启动堆栈，与"if{}"或"repeat{}"
                //类似，“条件”块可以返回分支的基于一的索引
                //以运行，也可以返回零/falsy以不运行分支。每次
                //子分支完成时，都会再次调用该块。这只是
                //对控制流块的当前模型的一个细微更改，并且
                //还与为"if"或"repeat"
                //块返回true/false兼容。
                //TODO:考虑使用类似块的nextStatement、previousStatement和
                //output属性作为替代方法。这些方法更灵活，但允许错误的组合。
                blockType: Scratch.BlockType.REPORTER,

                // Required for conditional blocks, ignored for others: the number of
                // child branches this block controls. An "if" or "repeat" block would
                // specify a branch count of 1; an "if-else" block would specify a
                // branch count of 2.
                // TODO: should we support dynamic branch count for "switch"-likes?
                //条件块需要，其他块忽略：此块控制的//子分支数。"if"或"repeat"块将
                //指定分支计数为1；"if else"块将
                //指定分支计数为2。
                //TODO:是否应支持"交换机"的动态分支计数？
                branchCount: 0,

                // Optional, default false: whether or not this block ends a stack.
                // The "forever" and "stop all" blocks would specify true here.
                //可选，默认为false：此块是否结束堆栈。//"forever"和"stop all"块将在此处指定true。
                isTerminal: true,

                // Optional, default false: whether or not to block all threads while
                // this block is busy. This is for things like the "touching color"
                // block in compatibility mode, and is only needed if the VM runs in a
                // worker. We might even consider omitting it from extension docs...
                //可选，默认为false：是否在
                //此块繁忙时阻止所有线程。这适用于兼容模式下的"
                //块，仅当VM在
                //工作进程中运行时才需要。我们甚至可以考虑在扩展文档中省略它。。。
                blockAllThreads: false,

                // Required: the human-readable text on this block, including argument
                // placeholders. Argument placeholders should be in [MACRO_CASE] and
                // must be [ENCLOSED_WITHIN_SQUARE_BRACKETS].
                //必需：此块上的可读文本，包括参数
                //占位符。参数占位符应在[MACRO\u大小写]中，
                //必须在[MACRO\u方括号]中。
                text: 'letter [LETTER_NUM] of [TEXT]',

                // Required: describe each argument.
                // Note that this is an array: the order of arguments will be used
                //必选：描述每个参数。//请注意，这是一个数组：将使用参数的顺序
                arguments: {
                    // Required: the ID of the argument, which will be the name in the
                    // args object passed to the implementation function.
                    //Required：参数的ID，它将是传递给实现函数的//args对象中的名称。
                    LETTER_NUM: {
                        // Required: type of the argument / shape of the block input
                        //必需：参数类型/块输入的形状
                        type: Scratch.ArgumentType.NUMBER,

                        // Optional: the default value of the argument
                        //可选：参数的默认值
                        defaultValue: 1
                    },

                    // Required: the ID of the argument, which will be the name in the
                    // args object passed to the implementation function.
                    //Required：参数的ID，它将是传递给实现函数的//args对象中的名称。
                    TEXT: {
                        // Required: type of the argument / shape of the block input
                        //必需：参数类型/块输入的形状
                        type: Scratch.ArgumentType.STRING,

                        // Optional: the default value of the argument
                        //可选：参数的默认值
                        defaultValue: 'text'
                    }
                },

                // Optional: a string naming the function implementing this block.
                // If this is omitted, use the opcode string.
                //可选：命名实现此块的函数的字符串。//如果省略，请使用操作码字符串。
                func: 'myReporter',

                // Optional: list of target types for which this block should appear.
                // If absent, assume it applies to all builtin targets -- that is:
                // ['sprite', 'stage']
                //可选：显示此块的目标类型列表。
                //如果不存在，则假定它适用于所有内置目标，即：
                //['sprite'，stage']'
                filter: ['someBlocks.wedo2', 'sprite', 'stage']
            },
            {
                opcode: 'example-Boolean',
                blockType: Scratch.BlockType.BOOLEAN,
                text: 'return true',
                func: 'returnTrue'
            },
            {
                opcode: 'example-hat',
                blockType: Scratch.BlockType.HAT,
                text: 'after forever',
                func: 'returnFalse'
            },
            {
                // Another block...
            }
        ],

        // Optional: define extension-specific menus here.
        menus: {
            // Required: an identifier for this menu, unique within this extension.
            menuA: [
                // Static menu: list items which should appear in the menu.
                {
                    // Required: the value of the menu item when it is chosen.
                    value: 'itemId1',

                    // Optional: the human-readable label for this item.
                    // Use `value` as the text if this is absent.
                    text: 'Item One'
                },

                // The simplest form of a list item is a string which will be used as
                // both value and text.
                'itemId2'
            ],

            // Dynamic menu: a string naming a function which returns an array as above.
            // Called each time the menu is opened.
            menuB: 'getItemsForMenuB'
        },

        // Optional: translations
        translation_map: {
            de: {
                'extensionName': 'Einige Blöcke',
                'myReporter': 'Buchstabe [LETTER_NUM] von [TEXT]',
                'myReporter.TEXT_default': 'Text',
                'menuA_item1': 'Artikel eins',

                // Dynamic menus can be translated too
                'menuB_example': 'Beispiel',

                // This message contains ICU placeholders (see `myReporter()` below)
                'myReporter.result': 'Buchstabe {LETTER_NUM} von {TEXT} ist {LETTER}.'
            },
            it: {
                // ...
            }
        },

        // Optional: list new target type(s) provided by this extension.
        targetTypes: [
            'wedo2', // automatically transformed to 'someBlocks.wedo2'
            'speech' // automatically transformed to 'someBlocks.speech'
        ]
    };
};

/**
 * Implement myReporter.
 * @param {object} args - the block's arguments.
 * @property {number} LETTER_NUM - the string value of the argument.
 * @property {string} TEXT - the string value of the argument.
 * @returns {string} a string which includes the block argument value.
 */
ExampleExtension.prototype.myReporter = function (args) {
    // Note: this implementation is not Unicode-clean; it's just here as an example.
    const result = args.TEXT.charAt(args.LETTER_NUM);

    return ['Letter ', args.LETTER_NUM, ' of ', args.TEXT, ' is ', result, '.'].join('');
};

ExampleExtension.prototype.noop = function () {
};

ExampleExtension.prototype.returnTrue = function () {
    return true;
};

ExampleExtension.prototype.returnFalse = function () {
    return false;
};

Scratch.extensions.register(new ExampleExtension());
