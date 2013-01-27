import digest_tool
import unittest


class DigestToolTestCase(unittest.TestCase):
    def setUp(self):
        digest_tool.app.config['TESTING'] = True
        self.app = digest_tool.app.test_client()

if __name__ == '__main__':
    unittest.main()
