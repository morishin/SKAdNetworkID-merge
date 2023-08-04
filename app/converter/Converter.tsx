"use client";

import {
  ChangeEventHandler,
  FocusEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "~/app/converter/converter.module.css";

const regex = /[0-9a-z]+\.skadnetwork/g;

const Converter = () => {
  const [input1, setInput1] = useState(EXAMPLE1);
  const [input2, setInput2] = useState(EXAMPLE2);
  const [output, setOutput] = useState("");
  const onChangeInput1: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput1(e.target.value);
  };
  const onChangeInput2: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput2(e.target.value);
  };
  const onFocusOutput: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    e.target.select();
  };

  const ids1 = useMemo(
    () => [...input1.matchAll(regex)].map((match) => match[0]),
    [input1]
  );
  const ids2 = useMemo(
    () => [...input2.matchAll(regex)].map((match) => match[0]),
    [input2]
  );
  useEffect(() => {
    const ids = [...new Set([...ids1, ...ids2])];
    const contents = ids
      .map(
        (id) =>
          `  <dict>
    <key>SKAdNetworkIdentifier</key>
    <string>${id}</string>
  </dict>`
      )
      .join("\n");
    const result = `
      <key>SKAdNetworkItems</key>
<array>
${contents}
</array>
    `.trim();
    setOutput(result);
  }, [ids1, ids2]);

  return (
    <div className={styles.root}>
      <div className={styles.inputTextAreasContainer}>
        <h2>Input 1</h2>
        <div className={styles.inputTextAreaContainer}>
          <textarea
            className={styles.inputTextArea}
            value={input1}
            onChange={onChangeInput1}
          ></textarea>
        </div>
        <h2>Input 2</h2>
        <div className={styles.inputTextAreaContainer}>
          <textarea
            className={styles.inputTextArea}
            value={input2}
            onChange={onChangeInput2}
          ></textarea>
        </div>
      </div>
      <div className={styles.outputTextAreaContainer}>
        <h2>Output</h2>
        <textarea
          className={styles.outputTextArea}
          value={output}
          onChange={() => {}}
          onFocus={onFocusOutput}
        ></textarea>
      </div>
    </div>
  );
};

const EXAMPLE1 = `
<plist version="1.0">
  <key>SKAdNetworkItems</key>
  <array>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>aaaaaaaaaa.skadnetwork</string>
    </dict>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>bbbbbbbbbb.skadnetwork</string>
    </dict>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>cccccccccc.skadnetwork</string>
    </dict>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>dddddddddd.skadnetwork</string>
    </dict>
  </array>
</plist>
`.trim();

const EXAMPLE2 = `
<plist version="1.0">
  <key>SKAdNetworkItems</key>
  <array>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>cccccccccc.skadnetwork</string>
    </dict>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>dddddddddd.skadnetwork</string>
    </dict>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>eeeeeeeeee.skadnetwork</string>
    </dict>
    <dict>
      <key>SKAdNetworkIdentifier</key>
      <string>ffffffffff.skadnetwork</string>
    </dict>
  </array>
</plist>
`.trim();

export default Converter;
