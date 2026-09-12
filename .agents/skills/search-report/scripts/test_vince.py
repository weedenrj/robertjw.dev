import unittest
from unittest.mock import patch

from vince import CONTACT_FILTER, CONTROL_FILTER, contact_counts


class ContactCountsTest(unittest.TestCase):
    @patch('vince.query')
    def test_verified_contact_counts(self, query):
        query.side_effect = [{'events': 0, 'visitors': 0}, {'events': 3, 'visitors': 2}]
        result = contact_counts({}, {'from': '2026-09-11', 'to': '2026-09-12'})
        self.assertEqual(result['status'], 'available')
        self.assertEqual(result['events'], 3)
        self.assertEqual(query.call_args_list[0].args[2]['filters'], CONTROL_FILTER)
        self.assertEqual(query.call_args_list[1].args[2]['filters'], CONTACT_FILTER)
        self.assertEqual(query.call_args_list[1].args[2]['metrics'], 'events,visitors')

    @patch('vince.query')
    def test_ignored_filter_never_becomes_contact_total(self, query):
        query.return_value = {'events': 25, 'visitors': 4}
        result = contact_counts({}, {})
        self.assertEqual(result['status'], 'unavailable')
        self.assertNotIn('events', result)
        query.assert_called_once()

    @patch('vince.query')
    def test_missing_metrics_are_not_zero(self, query):
        query.return_value = {}
        self.assertEqual(contact_counts({}, {})['status'], 'unavailable')
        query.side_effect = [{'events': 0, 'visitors': 0}, {'visitors': 1}]
        self.assertEqual(contact_counts({}, {})['status'], 'unavailable')


if __name__ == '__main__':
    unittest.main()
