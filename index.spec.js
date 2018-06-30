import findDeltas from './index';

describe('#findDeltas', () => {
  describe('unhappy path', () => {
    it('throws error if not passed two arguments', () => {
      expect(() => {
        findDeltas();
      }).toThrow(TypeError);
      expect(() => {
        findDeltas(10);
      }).toThrow(TypeError);
    });
    it('throws error if the first argument is not a number', () => {
      expect(() => {
        findDeltas('ten', 90);
      }).toThrow(TypeError);
    });
    it('throws error if the second argument is not a number', () => {
      expect(() => {
        findDeltas(10, '90');
      }).toThrow(TypeError);
    });
    it('throws error if the third argument is not a boolean', () => {
      expect(() => {
        findDeltas(10, 90, 'true');
      }).toThrow(TypeError);
    });
  });
  describe('happy path', () => {
    describe('degrees', () => {
      describe('degrees between 0 and 360', () => {
        it('returns {x: 10, y: 0} for length 10 at 0 degrees (due east)', () => {
          const deltas = findDeltas(10, 0);
          expect(deltas.x).toBeCloseTo(10);
          expect(deltas.y).toBeCloseTo(0);
        });
        it('returns {x: 7.071, y: -7.071} for length 10 at 45 degrees (north-east)', () => {
          const deltas = findDeltas(10, 45);
          expect(deltas.x).toBeCloseTo(7.07106781);
          expect(deltas.y).toBeCloseTo(-7.07106781);
          expect(Math.abs(deltas.x)).toBeCloseTo(Math.abs(deltas.y));
        });
        it('returns {x: 0, y: -10} for length 10 at 90 degrees (due north)', () => {
          const deltas = findDeltas(10, 90);
          expect(deltas.x).toBeCloseTo(0);
          expect(deltas.y).toBeCloseTo(-10);
        });
        it('returns {x: -7.071, y: -7.071} for length 10 at 135 degrees (north-west)', () => {
          const deltas = findDeltas(10, 135);
          expect(deltas.x).toBeCloseTo(-7.07106781);
          expect(deltas.y).toBeCloseTo(-7.07106781);
          expect(Math.abs(deltas.x)).toBeCloseTo(Math.abs(deltas.y));
        });
        it('returns {x: -10, y: 0} for length 10 at 180 degrees (due west)', () => {
          const deltas = findDeltas(10, 180);
          expect(deltas.x).toBeCloseTo(-10);
          expect(deltas.y).toBeCloseTo(0);
        });
        it('returns {x: -7.071, y: 7.071} for length 10 at 225 degrees (south-west)', () => {
          const deltas = findDeltas(10, 225);
          expect(deltas.x).toBeCloseTo(-7.07106781);
          expect(deltas.y).toBeCloseTo(7.07106781);
          expect(Math.abs(deltas.x)).toBeCloseTo(Math.abs(deltas.y));
        });
        it('returns {x: 0, y: 10} for length 10 at 270 degrees (due south)', () => {
          const deltas = findDeltas(10, 270);
          expect(deltas.x).toBeCloseTo(0);
          expect(deltas.y).toBeCloseTo(10);
        });
        it('returns {x: 7.071, y: 7.071} for length 10 at 315 degrees (south-east)', () => {
          const deltas = findDeltas(10, 315);
          expect(deltas.x).toBeCloseTo(7.07106781);
          expect(deltas.y).toBeCloseTo(7.07106781);
          expect(Math.abs(deltas.x)).toBeCloseTo(Math.abs(deltas.y));
        });
      });
      describe('degrees less than 0', () => {
        it('returns {x: 0, y: 10} for length 10 at -90 degrees (due south)', () => {
          const deltas = findDeltas(10, -90);
          expect(deltas.x).toBeCloseTo(0);
          expect(deltas.y).toBeCloseTo(10);
        });
      });
      describe('when the degrees is greater than a single rotation', () => {
        it('returns {x: 0, y: -10} for length 10 at 450 degrees (due north)', () => {
          const deltas = findDeltas(10, 450);
          expect(deltas.x).toBeCloseTo(0);
          expect(deltas.y).toBeCloseTo(-10);
        });
        it('returns {x: 0, y: -10} for length 10 at -450 degrees (due south)', () => {
          const deltas = findDeltas(10, -450);
          expect(deltas.x).toBeCloseTo(0);
          expect(deltas.y).toBeCloseTo(10);
        });
      });
    });
    describe('radians', () => {
      it('returns {x: 7.071, y: -7.071} for length 10 and 0.25pi radians (north-east)', () => {
        const deltas = findDeltas(10, Math.PI * 0.25, true);
        expect(deltas.x).toBeCloseTo(Math.sqrt(50));
        expect(deltas.y).toBeCloseTo(-Math.sqrt(50));
        expect(Math.abs(deltas.x)).toBeCloseTo(Math.abs(deltas.y));
      });
    });
  });
});
