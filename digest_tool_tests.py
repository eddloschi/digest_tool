import digest_tool
import hashlib
import unittest


class DigestToolTestCase(unittest.TestCase):
    def setUp(self):
        digest_tool.app.config['TESTING'] = True
        self.app = digest_tool.app.test_client()
        self.message = 'Hello World!'

    def test_builtin_algorithms(self):
        for algorithm in hashlib.algorithms:
            h = hashlib.new(algorithm)
            h.update(self.message)
            rv = self.app.post('/hash/%s' % algorithm, data={'message': self.message})
            assert rv.data == h.hexdigest()

    def test_ripemd160(self):
        h = hashlib.new('ripemd160')
        h.update(self.message)
        rv = self.app.post('/hash/ripemd160', data={'message': self.message})
        assert rv.data == h.hexdigest()

    def test_wrong_algorithm(self):
        rv = self.app.post('/hash/wrong', data={'message': self.message})
        assert rv.status_code == 404

if __name__ == '__main__':
    unittest.main()
