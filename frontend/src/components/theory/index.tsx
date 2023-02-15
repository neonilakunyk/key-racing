import React from 'react';
import { TheoryBlock, TheoryCard } from './components';
import { Page } from 'components/common';
import { getAllowedClasses } from 'common/helpers';
import handTypingImage from 'assets/img/handtyping.gif';
import eyesImage from 'assets/img/eyes.gif';
import quickTypeImage from 'assets/img/quicktype.gif';
import typingFingersImage from 'assets/img/typing-10-fingers.jpg';
import mainKeysImage from 'assets/img/main-keys.png';
import styles from './styles.module.scss';

const Theory: React.FC = () => {
  return (
    <Page heading="Blind print">
      <TheoryBlock title="A little bit of history">
        <div className={getAllowedClasses('shadow-sm', styles.handTypingGif)}>
          <img src={handTypingImage} />
        </div>
        <p>
          Blind typing is a technique of typing &quot;blind&quot;, that is,
          without looking at the keys of a typewriter or keyboard, using all (or
          most) of the fingers. Formerly known as
          <strong> the American ten-finger blind method</strong>. It has been in
          existence for over <strong>120 years</strong>.
        </p>
        <p>
          Blind typing was
          <strong> developed by Frank Edgar McGurrin</strong>, a Salt Lake City
          court stenographer. On July 25, 1888, McGurrin, the only known person
          to use this method at the time, won the first printing competition
          held in Cincinnati. The results of the competition appeared on the
          front pages of many newspapers.
        </p>
      </TheoryBlock>
      <hr />
      <TheoryBlock title="Why blind print?">
        <p>
          When it comes to the benefits of blind printing, they usually talk
          about high speed.
          <strong>Typing quickly means saving time</strong>, which is sometimes
          so lacking.
        </p>
        <div
          className={getAllowedClasses(
            'd-flex me-2 justify-content-between',
            styles.reasons,
          )}
        >
          <TheoryCard image={eyesImage}>
            <p>
              <strong>Firstly</strong>, these are our eyes. If you type a text,
              and during all the time you looking from the monitor to the
              buttons and back, then the eyes very quickly begin to get tired.
            </p>
            <p>
              Using the ten-finger typing method, you do not need to look at the
              keyboard at all, so you will be less tired, and your neck and eyes
              will not hurt.
            </p>
          </TheoryCard>
          <TheoryCard image={quickTypeImage}>
            <p>
              <strong>Secondly</strong>, when you are typing blindly, text input
              becomes a completely mechanical work - the desired letter is
              unmistakably pressed by the finger it should be pressed.
            </p>
            <p>
              As a result, your attention is focused not on typing, but only on
              how express your thoughts in the most beautiful and meaningful
              possible way.
            </p>
          </TheoryCard>
        </div>
      </TheoryBlock>
      <hr />
      <TheoryBlock
        title="Ten-finger method"
        tip="For fast typing, keep a steady rhythm with a
          gradual increase in tempo, that is, a shorter time interval between
          key strokes."
      >
        <div className={getAllowedClasses('d-flex', styles.tenFingerMethod)}>
          <div className={styles.tenFingerText}>
            <p>
              What is ten-finger typing and how to quickly learn to touch
              typing? Blind typing (American blind ten-finger typing) is typing
              on a keyboard or typewriter, in which a person does not look at
              the keys and types with ten fingers.
            </p>
            <p>
              Learning to type quickly and without errors is possible only with
              a strict distribution of keyboard keys between all ten fingers. In
              the English layout, initially the fingers (except thumbs) are
              located in the<strong> &quot;A S D F&quot;</strong> and
              <strong>&quot;J K L&quot;</strong> positions.
            </p>

            <p>
              The computer keyboard is designed in such a way that it allows you
              to perform all the necessary operations: type, edit and format
              text without using a mouse. Which is even faster with some
              practice.
            </p>
          </div>
          <div className={styles.tenFingerPng}>
            <div className={getAllowedClasses('shadow-sm', styles.tenFingers)}>
              <img src={typingFingersImage} />
            </div>
            <div className={getAllowedClasses('shadow-sm', styles.mainKeys)}>
              <img src={mainKeysImage} />
            </div>
          </div>
        </div>
      </TheoryBlock>
    </Page>
  );
};

export { Theory };
